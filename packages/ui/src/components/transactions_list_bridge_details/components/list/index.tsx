/* eslint-disable no-nested-ternary */
// import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useRecoilValue } from 'recoil';
import Loading from '@/components/loading';
import useStyles from '@/components/transactions_list_details/components/list/styles';
import type { TransactionsListBridgeDetailsState } from '@/components/transactions_list_bridge_details/types';
import { useList, useListRow } from '@/hooks/use_react_window';
import { readDate } from '@/recoil/settings';
import { useDisplayStyles } from '@/styles/useSharedStyles';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import { mergeRefs } from '@/utils/merge_refs';
import { ACCOUNT_DETAILS, getMiddleEllipsis, TRANSACTION_DETAILS } from '@/utils';
import Link from 'next/link';
import { Tooltip, Zoom } from '@mui/material';
import SingleBridgeTransaction from './components/single_transaction';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  isItemLoaded: TransactionsListBridgeDetailsState['isItemLoaded'];
  transaction: TransactionsListBridgeDetailsState['transactions'][number];
};

const ListItem: FC<ListItemProps> = ({ index, style, setRowHeight, isItemLoaded, transaction }) => {
  const { rowRef } = useListRow(index, setRowHeight);
  const display = useDisplayStyles().classes;
  // const { t } = useTranslation('transactions');
  const dateFormat = useRecoilValue(readDate);
  const { classes } = useStyles();

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
    key: `${transaction.txHash_1}-${transaction.txHash_2}`,
    route: <div>{transaction.route}</div>,
    amount: <div>{transaction.amount}</div>,
    txHash_1: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.txHash_1}</pre>}
        placement="bottom"
        arrow
      >
        <Link shallow prefetch={false} href={TRANSACTION_DETAILS(transaction.txHash_1)}>
          <span className={display.hiddenUntilLg}>
            {getMiddleEllipsis(transaction?.txHash_1 || '', {
              beginning: 15,
              ending: 4,
            })}
          </span>
          <span className={display.hiddenWhenLg}>
            {getMiddleEllipsis(transaction?.txHash_1 || '', {
              beginning: 15,
              ending: 10,
            })}
          </span>
        </Link>
      </Tooltip>
    ),
    txHash_2: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.txHash_2}</pre>}
        placement="bottom"
        arrow
      >
        <Link shallow prefetch={false} href={TRANSACTION_DETAILS(transaction.txHash_2)}>
          <span className={display.hiddenUntilLg}>
            {getMiddleEllipsis(transaction?.txHash_2 || '', {
              beginning: 15,
              ending: 4,
            })}
          </span>
          <span className={display.hiddenWhenLg}>
            {getMiddleEllipsis(transaction?.txHash_2 || '', {
              beginning: 15,
              ending: 10,
            })}
          </span>
        </Link>
      </Tooltip>
    ),
    destination: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.destination}</pre>}
        placement="bottom"
        arrow
      >
        <Link shallow prefetch={false} href={ACCOUNT_DETAILS(transaction.destination)}>
          <span className={display.hiddenUntilLg}>
            {getMiddleEllipsis(transaction?.destination || '', {
              beginning: 15,
              ending: 4,
            })}
          </span>
          <span className={display.hiddenWhenLg}>
            {getMiddleEllipsis(transaction?.destination || '', {
              beginning: 15,
              ending: 10,
            })}
          </span>
        </Link>
      </Tooltip>
    ),
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

const TransactionList: FC<TransactionsListBridgeDetailsState> = ({
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
