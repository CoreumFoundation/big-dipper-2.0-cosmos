import { FC } from 'react';
import Loading from '@/components/loading';
import NoData from '@/components/no_data';
import Desktop from '@/components/transactions_list_bridge/components/desktop';
import Mobile from '@/components/transactions_list_bridge/components/mobile';
import type { TransactionsListBridgeState } from '@/components/transactions_list_bridge/types';
import { useDisplayStyles } from '@/styles/useSharedStyles';

const TransactionsListBridge: FC<TransactionsListBridgeState> = (props) => {
  const {
    hasNextPage = false,
    isNextPageLoading = false,
    loadNextPage = () => null,
    loadMoreItems = () => null,
    isItemLoaded = () => true,
    itemCount,
    transactions,
  } = props;
  const display = useDisplayStyles().classes;

  const formatProps: TransactionsListBridgeState = {
    hasNextPage,
    isNextPageLoading,
    isItemLoaded,
    loadNextPage,
    loadMoreItems,
    itemCount,
    transactions,
  };

  if (!itemCount) {
    return isNextPageLoading ? <Loading /> : <NoData />;
  }

  return (
    <>
      <Desktop className={display.hiddenUntilLg} {...formatProps} />
      <Mobile className={display.hiddenWhenLg} {...formatProps} />
    </>
  );
};

export default TransactionsListBridge;
