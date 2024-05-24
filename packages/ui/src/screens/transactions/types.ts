import { Asset } from '../assets/hooks';
import { Coin } from './contract/Bridge.types';

export interface BridgeTransaction {
  source: string;
  coin: Coin;
  txHash_1: string;
  txHash_2: string;
  destination: string;
  timestamp: string;
  sender: string;
}

export interface TransactionsState {
  loading: boolean;
  exists: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Transactions[];
  bridgeItems: BridgeTransaction[];
  bridgeHasNextPage: boolean;
  tab: number;
  isBridgeNextPageLoading: boolean;
  assets: Asset[];
  metadatas: any[];
  assetsLoading: boolean;
  metadataLoading: boolean;
  isAllBridgeItemsFetched: boolean;
  bridgeLoading: boolean;
}
