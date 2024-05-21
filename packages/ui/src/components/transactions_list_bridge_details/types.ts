import { BridgeTransaction } from '@/screens/transactions/types';

export interface TransactionsListBridgeDetailsState {
  className?: string;
  hasNextPage?: boolean;
  isNextPageLoading?: boolean;
  loadNextPage?: (...args: unknown[]) => void;
  loadMoreItems?: (...args: unknown[]) => void;
  isItemLoaded?: (index: number) => boolean;
  itemCount: number;
  transactions: BridgeTransaction[];
}
