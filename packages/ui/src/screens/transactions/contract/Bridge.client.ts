import { JsonObject } from '@cosmjs/cosmwasm-stargate';
import { fromUtf8, toUtf8 } from '@cosmjs/encoding';
import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { BinaryReader } from 'cosmjs-types/binary';
import {
  QuerySmartContractStateRequest,
  QuerySmartContractStateResponse,
} from 'cosmjs-types/cosmwasm/wasm/v1/query';
import { PendingOperationsResponse } from './Bridge.types';

export interface BridgeReadOnlyInterface {
  contractAddress: string;
  pendingOperations: ({
    height,
  }: {
    height: number | undefined;
  }) => Promise<PendingOperationsResponse>;
}

const makeRequestABCI = async (
  base: QueryClient,
  service: string,
  method: string,
  data: Uint8Array,
  height: number | undefined
): Promise<Uint8Array> => {
  const path = `/${service}/${method}`;
  const response = await base.queryAbci(path, data, Number(height));

  return response.value;
};

const getSmartContractState = async (
  request: QuerySmartContractStateRequest,
  queryClient: QueryClient,
  height: number | undefined
): Promise<QuerySmartContractStateResponse> => {
  const data = QuerySmartContractStateRequest.encode(request).finish();

  const promise = makeRequestABCI(
    queryClient,
    'cosmwasm.wasm.v1.Query',
    'SmartContractState',
    data,
    height
  );

  return promise.then((resp) => QuerySmartContractStateResponse.decode(new BinaryReader(resp)));
};

const queryContractSmart = async (
  rpc: string,
  address: string,
  query: JsonObject,
  height: number | undefined
) => {
  const request = { address, queryData: toUtf8(JSON.stringify(query)) };
  const tendermintClient = await Tendermint34Client.connect(rpc);
  const queryClient = new QueryClient(tendermintClient);

  const { data } = await getSmartContractState(request, queryClient, height);

  let responseText: string;
  try {
    responseText = fromUtf8(data);
  } catch (error) {
    throw new Error(`Could not UTF-8 decode smart query response from contract: ${error}`);
  }
  try {
    return JSON.parse(responseText);
  } catch (error) {
    throw new Error(`Could not JSON parse smart query response from contract: ${error}`);
  }
};

export class BridgeQueryClient implements BridgeReadOnlyInterface {
  rpc: string;

  contractAddress: string;

  constructor(rpc: string, contractAddress: string) {
    this.contractAddress = contractAddress;
    this.rpc = rpc;
    this.pendingOperations = this.pendingOperations.bind(this);
  }

  pendingOperations = async ({ height }: { height?: number }): Promise<PendingOperationsResponse> =>
    queryContractSmart(
      this.rpc,
      this.contractAddress,
      {
        pending_operations: {},
      },
      height
    );
}
