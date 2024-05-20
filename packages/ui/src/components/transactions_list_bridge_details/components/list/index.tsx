/* eslint-disable no-nested-ternary */
// import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useRecoilValue } from 'recoil';
import Loading from '@/components/loading';
import useStyles from '@/components/transactions_list_details/components/list/styles';
import type { TransactionsListDetailsState } from '@/components/transactions_list_details/types';
import { useList, useListRow } from '@/hooks/use_react_window';
import { readDate } from '@/recoil/settings';
// import { useDisplayStyles } from '@/styles/useSharedStyles';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import { mergeRefs } from '@/utils/merge_refs';
import SingleBridgeTransaction from './components/single_transaction';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  isItemLoaded: TransactionsListDetailsState['isItemLoaded'];
  transaction: TransactionsListDetailsState['transactions'][number];
};

const ListItem: FC<ListItemProps> = ({ index, style, setRowHeight, isItemLoaded, transaction }) => {
  const { rowRef } = useListRow(index, setRowHeight);
  // const display = useDisplayStyles().classes;
  // const { t } = useTranslation('transactions');
  const dateFormat = useRecoilValue(readDate);
  const { classes } = useStyles();
  // const typeTagValue = getTagDisplayValue((transaction.messages.items[0] as any).type);

  if (!isItemLoaded?.(index)) {
    return (
      <div style={style}>
        <div ref={rowRef}>
          <Loading />
        </div>
      </div>
    );
  }

  const item = {
    key: transaction.hash,
    route: <div>route</div>,
    amount: <div>amount</div>,
    txHash_1: <div>txHash_1</div>,
    txHash_2: <div>txHash_2</div>,
    destination: <div>destination</div>,
    time: formatDayJs(dayjs.utc(transaction.timestamp), dateFormat),
  };
  return (
    <div style={style}>
      <div ref={rowRef}>
        <SingleBridgeTransaction {...item} className={classes.listItem} />
      </div>
    </div>
  );
};

const TransactionList: FC<TransactionsListDetailsState> = ({
  className,
  itemCount,
  loadMoreItems,
  isItemLoaded,
  transactions,
}) => {
  const { classes, cx } = useStyles();
  const { listRef, getRowHeight, setRowHeight } = useList();

  return (
    <div className={cx(classes.root, className)}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded ?? (() => true)}
            itemCount={itemCount}
            loadMoreItems={
              loadMoreItems ??
              (() => {
                // do nothing
              })
            }
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={height}
                itemCount={itemCount}
                itemSize={getRowHeight}
                onItemsRendered={onItemsRendered}
                ref={mergeRefs(listRef, ref)}
                width={width}
              >
                {({ index, style }) => (
                  <ListItem
                    key={index}
                    index={index}
                    style={style}
                    setRowHeight={setRowHeight}
                    isItemLoaded={isItemLoaded}
                    transaction={transactions[index]}
                  />
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default TransactionList;
