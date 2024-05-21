export interface BridgeTransaction {
  route: string;
  amount: any;
  txHash_1: string;
  txHash_2: string;
  destination: string;
  timestamp: string;
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
}
