/* eslint-disable no-nested-ternary */
import Loading from '@/components/loading';
import useStyles from '@/components/transactions_list_bridge/components/mobile/styles';
import type { TransactionsListBridgeState } from '@/components/transactions_list_bridge/types';
import { useList, useListRow } from '@/hooks/use_react_window';
import { mergeRefs } from '@/utils/merge_refs';
import Divider from '@mui/material/Divider';
import { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ExtendedTimestamp from '@/components/ExtendedTimestamp';
// import { useTranslation } from 'next-i18next';
import SingleBridgeTransactionMobile from '@/components/single_bridge_transaction_mobile';
import { ACCOUNT_DETAILS, getMiddleEllipsis, TRANSACTION_DETAILS } from '@/utils';
import { Tooltip, Zoom } from '@mui/material';
import Link from 'next/link';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  isItemLoaded: ((index: number) => boolean) | undefined;
  transaction: TransactionsListBridgeState['transactions'][number];
  isLast: boolean;
};

const ListItem: FC<ListItemProps> = ({
  index,
  style,
  setRowHeight,
  isItemLoaded,
  transaction,
  isLast,
}) => {
  // const { classes } = useStyles();
  // const { t } = useTranslation('transactions');
  const { rowRef } = useListRow(index, setRowHeight);

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
          {getMiddleEllipsis(transaction?.txHash_1 || '', {
            beginning: 7,
            ending: 4,
          })}
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
          {getMiddleEllipsis(transaction?.txHash_2 || '', {
            beginning: 7,
            ending: 4,
          })}
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
          {getMiddleEllipsis(transaction?.destination || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    time: <ExtendedTimestamp timestamp={transaction.timestamp} flexEnd={false} />,
  };

  return (
    <div style={style}>
      <div ref={rowRef}>
        <SingleBridgeTransactionMobile {...item} />
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

const Mobile: FC<TransactionsListBridgeState> = ({
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
                    isLast={index === itemCount - 1}
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

export default Mobile;
