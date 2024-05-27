/* eslint-disable no-nested-ternary */
import * as R from 'ramda';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import {
  TransactionsListenerSubscription,
  useTransactionsListenerSubscription,
  useTransactionsQuery,
} from '@/graphql/types/general_types';
import type { TransactionsState } from '@/screens/transactions/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';
import axios from 'axios';
import { JsonObject } from '@cosmjs/cosmwasm-stargate';
import chainConfig from '@/chainConfig';
import { BridgeQueryClient } from './contract/Bridge.client';
import { Operation } from './contract/Bridge.types';

const { chainType } = chainConfig();

// This is a bandaid as it can get extremely
// expensive if there is too much data
/**
 * Helps remove any possible duplication
 * and sorts by height in case it bugs out
 */
const uniqueAndSort = R.pipe(
  R.uniqBy((r: Transactions) => r?.hash),
  R.sort(R.descend((r) => r?.height))
);

const convertAmountToCoin = (amountToConvert: string): { amount: string; denom: string } => {
  // Use a regular expression to split the string into amount and denom
  const match = amountToConvert.match(/^(\d+)(.*)$/);

  if (!match) {
    throw new Error('Invalid amount format');
  }

  const [, amount, denom] = match;

  return { amount, denom };
};

const RPC_URL = `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:26657`;
// const RPC_URL =
//   chainType.toLowerCase() === 'mainnet'
//     ? 'https://full-node-uranium.mainnet-1.coreum.dev:26657'
//     : chainType.toLowerCase() === 'testnet'
//       ? 'https://full-node-pluto.testnet-1.coreum.dev:26657'
//       : 'https://full-node-uranium.devnet-1.coreum.dev:26657';

const CONTRACT_ADDRESS =
  chainType.toLowerCase() === 'mainnet'
    ? 'core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz'
    : chainType.toLowerCase() === 'testnet'
      ? 'testcore16sgampgtngjsmnj8zwz6h8zmh26nv2rs5kl72fuxkrzru5y5caxq82y4s5'
      : '';

const bridgeClient = new BridgeQueryClient(RPC_URL, CONTRACT_ADDRESS);

const queryContractSmart = async (height: number | undefined): Promise<JsonObject> => {
  const response = await bridgeClient.pendingOperations({ height });

  return response;
};

const formatTxData = (tx: any) => {
  const attributes = tx.tx_result.events.find(
    (item: { attributes: Array<{ key: string; value: string }>; type: string }) =>
      item.type === 'wasm'
  );

  let sender = '';
  let recipient = '';
  let coin = {
    denom: '',
    amount: '',
  };

  if (!attributes) {
    return undefined;
  }

  attributes.attributes.forEach((attr: { key: string; value: string }) => {
    switch (attr.key) {
      case 'sender':
        sender = attr.value;
        break;
      case 'recipient':
        recipient = attr.value;
        break;
      case 'coin':
        coin = convertAmountToCoin(attr.value);
        break;
      default:
    }
  });

  return {
    height: tx.height,
    txHash_1: tx.hash,
    txHash_2: '',
    sender,
    destination: recipient,
    coin,
    source: 'coreum',
  };
};

const getTxOperationsDiff = async (height: number): Promise<Operation[]> => {
  try {
    const operationsInBlock = await queryContractSmart(height);
    const operationsInPrevBlock = await queryContractSmart(height - 1);

    const { operations: operationsBlock } = operationsInBlock;
    const { operations: operationsPrevBlock } = operationsInPrevBlock;

    const setOperations = new Set(operationsBlock.map((operation: Operation) => operation.id));
    const setOperationsInPrevBlock = new Set(
      operationsPrevBlock.map((operation: Operation) => operation.id)
    );

    const operationsDiff: Operation[] = operationsBlock
      .filter((item: Operation) => !setOperationsInPrevBlock.has(item.id))
      .concat(operationsPrevBlock.filter((item: Operation) => !setOperations.has(item.id)));

    return operationsDiff;
  } catch (error) {
    return [];
  }
};

const fetchBridgeXRPLCoreumTxData = async ({
  page,
  limit,
  order_by = 'desc',
}: {
  page: string;
  limit: string;
  order_by?: 'asc' | 'desc';
}) => {
  try {
    const requestQuery = `wasm._contract_address='${CONTRACT_ADDRESS}' AND wasm.action='save_evidence' AND wasm.threshold_reached='true'`;
    const requestData = {
      jsonrpc: '2.0',
      method: 'tx_search',
      params: {
        query: requestQuery,
        prove: false,
        page,
        per_page: limit,
        order_by,
      },
      id: 1,
    };
    const response = await axios.post(RPC_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const { txs } = response.data.result;

      let filterTxs = txs
        .map((tx: any) => {
          const { events } = tx.tx_result;

          const wasmEvent = events.find((event: any) => event.type === 'wasm');
          let txHash1 = '';
          let issuer = '';
          let currency = '';
          let amount = '';
          let recipient = '';

          if (!wasmEvent) {
            return undefined;
          }

          wasmEvent.attributes.forEach((attr: { key: string; value: string }) => {
            switch (attr.key) {
              case 'hash':
                txHash1 = attr.value;
                break;
              case 'issuer':
                issuer = attr.value;
                break;
              case 'currency':
                currency = attr.value;
                break;
              case 'amount':
                amount = attr.value;
                break;
              case 'recipient':
                recipient = attr.value;
                break;
              default:
            }
          });

          if (!txHash1 || !issuer || !currency || !amount || !recipient) {
            return undefined;
          }

          return {
            height: tx.height,
            txHash_1: txHash1,
            txHash_2: tx.hash,
            sender: '',
            destination: recipient,
            coin: {
              amount,
              denom: currency,
            },
            source: 'xrpl',
          };
        })
        .filter((item: any) => item !== undefined);

      filterTxs = await Promise.all(
        filterTxs.map(async (transaction: any) => {
          const blockInfoData = {
            jsonrpc: '2.0',
            method: 'block',
            params: {
              height: transaction.height,
            },
            id: 1,
          };
          let timestamp = '';
          try {
            const blockResponse = await axios.post(RPC_URL, blockInfoData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            timestamp = blockResponse.data.result.block.header.time;
          } catch (error) {
            console.error(error);
          }
          return {
            ...transaction,
            timestamp,
          };
        })
      );

      return filterTxs;
    }

    return [];
  } catch (error) {
    return [];
  }
};

const fetchBridgeTxData = async ({
  page,
  limit,
  order_by = 'desc',
}: {
  page: string;
  limit: string;
  order_by?: 'asc' | 'desc';
}) => {
  try {
    const requestQuery = `wasm._contract_address='${CONTRACT_ADDRESS}' AND wasm.action='send_to_xrpl'`;
    const requestData = {
      jsonrpc: '2.0',
      method: 'tx_search',
      params: {
        query: requestQuery,
        prove: false,
        page,
        per_page: limit,
        order_by,
      },
      id: 1,
    };

    const response = await axios.post(RPC_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const { txs } = response.data.result;

      const transactions = txs.map(formatTxData);

      const resultBridgeTx = await Promise.all(
        transactions.map(async (transaction: any) => {
          const txOperations = await getTxOperationsDiff(transaction.height);

          const blockInfoData = {
            jsonrpc: '2.0',
            method: 'block',
            params: {
              height: transaction.height,
            },
            id: 1,
          };

          let timestamp = '';
          try {
            const blockResponse = await axios.post(RPC_URL, blockInfoData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            timestamp = blockResponse.data.result.block.header.time;
          } catch (error) {
            console.error(error);
          }

          const xrplTxHash = await Promise.all(
            txOperations.map(async (operation: Operation) => {
              const operation_id = operation.account_sequence || operation.ticket_sequence;
              const requestQueryOperations = `wasm._contract_address='${CONTRACT_ADDRESS}' AND wasm.operation_type='coreum_to_xrpl_transfer' AND wasm.action='save_evidence' AND wasm.operation_id=${operation_id}`;

              const requestDataOperations = {
                jsonrpc: '2.0',
                method: 'tx_search',
                params: {
                  query: requestQueryOperations,
                  prove: false,
                  order_by,
                  page: '1',
                  limit: '100',
                },
                id: 1,
              };

              const responseOperations = await axios.post(RPC_URL, requestDataOperations, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              let txHash = '';
              if (responseOperations.status === 200) {
                const { txs: saveEvidenceTxs } = responseOperations.data.result;

                const saveEvidenceAttributes = saveEvidenceTxs[0].tx_result.events.find(
                  (item: { attributes: Array<{ key: string; value: string }>; type: string }) =>
                    item.type === 'wasm'
                );

                if (!saveEvidenceAttributes) {
                  return undefined;
                }

                saveEvidenceAttributes.attributes.forEach(
                  (attr: { key: string; value: string }) => {
                    switch (attr.key) {
                      case 'tx_hash':
                        txHash = attr.value;
                        break;
                      default:
                        break;
                    }
                  }
                );
              }

              return txHash;
            })
          );

          return {
            ...transaction,
            timestamp,
            txHashes: xrplTxHash,
          };
        })
      );

      const transformedArray: any[] = [];
      resultBridgeTx.forEach((item) => {
        if (item.txHashes.length) {
          item.txHashes.forEach((hash: string) => {
            transformedArray.push({
              ...item,
              txHash_2: hash,
            });
          });
        } else {
          transformedArray.push(item);
        }
      });

      return transformedArray;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const formatSpenderAndReceiver = (messages: any[], transactionLogs: any[], denom: string) => {
  const attributes = transactionLogs?.[0]?.events.filter(
    (event: any) => event.attributes.length > 1
  );
  let sender = '-';

  if (messages?.length) {
    sender =
      messages.length === 1
        ? messages[0].executor ||
          messages[0].from_address ||
          messages[0].issuer ||
          messages[0].grantee ||
          messages[0].granter ||
          messages[0].depositor ||
          messages[0].submitter ||
          messages[0].proposer ||
          messages[0].voter ||
          messages[0].delegator_address ||
          messages[0].admin ||
          messages[0].address ||
          messages[0].sender ||
          '-'
        : 'Multiple';
  }

  const receivers = attributes
    ?.map((e: any) => {
      const receiverItems = e.attributes.filter((attr: any) => attr.key === 'receiver');

      return receiverItems;
    })
    .filter((item: any) => item.length);

  let receiver = '-';

  if (receivers?.length) {
    receiver = receivers.length === 1 ? receivers[0][0].value : 'Multiple';
  }

  let amount = '';
  const coinReceivedEvents = attributes?.filter((item: any) => item.type === 'coin_received');

  if (coinReceivedEvents?.length === 1) {
    const amountAttribute = coinReceivedEvents[0].attributes.find(
      (item: any) => item.key === 'amount' && item.value?.includes(denom)
    );

    if (amountAttribute) {
      amount = amountAttribute.value;
    }
  }

  return {
    sender,
    receiver: receiver.replaceAll('"', ''),
    amount,
  };
};

const formatTransactions = (data: TransactionsListenerSubscription): TransactionsState['items'] => {
  let formattedData = data.transactions;
  if (data.transactions.length === 51) {
    formattedData = data.transactions.slice(0, 51);
  }

  return formattedData.map((x) => {
    const { fee } = x;
    const feeAmount = fee?.amount?.[0] ?? {
      denom: '',
      amount: 0,
    };

    const { sender, receiver, amount } = formatSpenderAndReceiver(
      x.messages,
      x.logs,
      feeAmount.denom
    );

    const formatedAmount =
      amount !== '' && amount !== '-'
        ? formatToken(amount.replace(feeAmount.denom, ''), feeAmount.denom)
        : amount;

    const messages = convertMsgsToModels(x);
    const msgType =
      x.messages?.map((eachMsg: unknown) => {
        const eachMsgType = R.pathOr('none type', ['@type'], eachMsg);
        return eachMsgType ?? '';
      }) ?? [];

    const convertedMsgType = convertMsgType(msgType);

    return {
      height: x.height,
      hash: x.hash,
      type: convertedMsgType,
      fee: formatToken(feeAmount.amount, feeAmount.denom),
      amount: formatedAmount,
      sender,
      receiver,
      messages: {
        count: x.messages.length,
        items: messages,
      },
      success: x.success,
      timestamp: x.block.timestamp,
    };
  });
};

export const useTransactions = () => {
  const [state, setState] = useState<TransactionsState>({
    loading: true,
    exists: true,
    hasNextPage: false,
    isNextPageLoading: true,
    items: [],
    bridgeItems: [],
    bridgeLoading: true,
    isAllBridgeItemsFetched: false,
    bridgeHasNextPage: false,
    isBridgeNextPageLoading: true,
    tab: 0,
    assets: [],
    metadatas: [],
    assetsLoading: true,
    metadataLoading: true,
  });

  const getAssetsList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/${chainType.toLowerCase()}/assets.json`
      );

      handleSetState((prevState) => ({
        ...prevState,
        assets: response.data.assets,
        assetsLoading: false,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
      }));
    }
  }, []);

  const getDenomMetadatas = useCallback(async () => {
    try {
      const {
        data: {
          pagination: { total },
        },
      } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/cosmos/bank/v1beta1/denoms_metadata`
      );
      const {
        data: { metadatas },
      } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/cosmos/bank/v1beta1/denoms_metadata?pagination.limit=${total}`
      );

      handleSetState((prevState) => ({
        ...prevState,
        metadatas,
        metadataLoading: false,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    getAssetsList();
    getDenomMetadatas();
  }, []);

  const handleSetState = (stateChange: (prevState: TransactionsState) => TransactionsState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  };

  const handleTabChange = useCallback(
    (_event: SyntheticEvent<Element, globalThis.Event>, newValue: number) => {
      setState((prevState) => ({
        ...prevState,
        tab: newValue,
      }));
    },
    []
  );

  // ================================
  // tx subscription
  // ================================
  useTransactionsListenerSubscription({
    variables: {
      limit: 1,
      offset: 0,
    },
    onData: (data) => {
      const newItems = uniqueAndSort([
        ...(data.data.data ? formatTransactions(data.data.data) : []),
        ...state.items,
      ]);
      handleSetState((prevState) => ({
        ...prevState,
        items: newItems,
      }));
    },
  });

  // ================================
  // tx query
  // ================================
  const LIMIT = 51;
  const transactionQuery = useTransactionsQuery({
    variables: {
      limit: LIMIT,
      offset: 1,
    },
    onError: () => {
      handleSetState((prevState) => ({ ...prevState, loading: false }));
    },
    onCompleted: (data) => {
      const itemsLength = data.transactions.length;
      const newItems = uniqueAndSort([...state.items, ...formatTransactions(data)]);
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        items: newItems,
        hasNextPage: itemsLength === LIMIT,
        isNextPageLoading: false,
      }));
    },
  });

  const loadNextPage = async () => {
    handleSetState((prevState) => ({ ...prevState, isNextPageLoading: true }));
    // refetch query
    await transactionQuery
      .fetchMore({
        variables: {
          offset: state.items.length,
          limit: LIMIT,
        },
      })
      .then(({ data }) => {
        const itemsLength = data.transactions.length;
        const newItems = uniqueAndSort([
          ...state.items,
          ...formatTransactions(data),
        ]) as TransactionsState['items'];
        // set new state
        handleSetState((prevState) => ({
          ...prevState,
          items: newItems,
          isNextPageLoading: false,
          hasNextPage: itemsLength === LIMIT,
        }));
      });
  };

  const BRIDGE_TX_LIMIT = 51;
  const BRIDGE_XRPL_TX_LIMIT = 100;
  const getBridgeTxs = async () => {
    handleSetState((prevState) => ({
      ...prevState,
      isBridgeNextPageLoading: true,
    }));
    const currentPage = Math.floor(state.bridgeItems.length / 100);

    const xrplCoreumBridgeTransactions = await fetchBridgeXRPLCoreumTxData({
      page: String(currentPage + 1),
      limit: String(BRIDGE_XRPL_TX_LIMIT),
    });

    const bridgeTransactions = await fetchBridgeTxData({
      page: String(currentPage + 1),
      limit: String(BRIDGE_TX_LIMIT),
    });

    const newTransactionItems = bridgeTransactions
      .concat(xrplCoreumBridgeTransactions)
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

    handleSetState((prevState) => ({
      ...prevState,
      bridgeLoading: false,
      bridgeItems: state.bridgeItems.concat(newTransactionItems),
      isBridgeNextPageLoading: false,
      bridgeHasNextPage:
        bridgeTransactions.length === BRIDGE_TX_LIMIT || xrplCoreumBridgeTransactions > 1,
    }));
  };

  useEffect(() => {
    getBridgeTxs();
    handleSetState((prevState) => ({
      ...prevState,
      bridgeLoading: false,
    }));
  }, []);

  const loadBridgeNextPage = async () => {
    await getBridgeTxs();
  };

  return {
    state,
    loadNextPage,
    handleTabChange,
    loadBridgeNextPage,
  };
};
