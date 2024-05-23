import { FC } from 'react';
import NoData from '@/components/no_data';
import List from '@/components/transactions_list_bridge_details/components/list';
import type { TransactionsListBridgeDetailsState } from '@/components/transactions_list_bridge_details/types';

const TransactionsListBridgeDetails: FC<TransactionsListBridgeDetailsState> = (props) => {
  // setting fallback values
  const {
    hasNextPage = false,
    isNextPageLoading = false,
    loadNextPage = () => null,
    loadMoreItems = () => null,
    isItemLoaded = () => true,
    itemCount,
    transactions,
    assets,
    metadatas,
  } = props;

  const formatProps: TransactionsListBridgeDetailsState = {
    hasNextPage,
    isNextPageLoading,
    isItemLoaded,
    loadNextPage,
    loadMoreItems,
    itemCount,
    transactions,
    assets,
    metadatas,
  };

  if (!itemCount) {
    return <NoData />;
  }

  return <List {...formatProps} />;
};

export default TransactionsListBridgeDetails;
