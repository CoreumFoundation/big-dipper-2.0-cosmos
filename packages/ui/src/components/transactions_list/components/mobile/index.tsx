/* eslint-disable no-nested-ternary */
import Loading from '@/components/loading';
import Result from '@/components/result';
import SingleTransactionMobile from '@/components/single_transaction_mobile';
import Tag from '@/components/tag';
import useStyles from '@/components/transactions_list/components/mobile/styles';
import type { TransactionsListState } from '@/components/transactions_list/types';
import { useList, useListRow } from '@/hooks/use_react_window';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import { ACCOUNT_DETAILS, BLOCK_DETAILS, TRANSACTION_DETAILS } from '@/utils/go_to_page';
import { mergeRefs } from '@/utils/merge_refs';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import numeral from 'numeral';
import { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import CopyIcon from 'shared-utils/assets/icon-copy.svg';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { formatNumber } from '@/utils/format_token';
import { Typography } from '@mui/material';
import ExtendedTimestamp from '@/components/ExtendedTimestamp';
import { useTranslation } from 'next-i18next';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  isItemLoaded: ((index: number) => boolean) | undefined;
  transaction: TransactionsListState['transactions'][number];
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
  const { classes } = useStyles();
  const { t } = useTranslation('transactions');
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
    block: (
      <Link shallow prefetch={false} href={BLOCK_DETAILS(transaction.height)}>
        {numeral(transaction.height).format('0,0')}
      </Link>
    ),
    hash: (
      <>
        <Link shallow prefetch={false} href={TRANSACTION_DETAILS(transaction.hash)}>
          {getMiddleEllipsis(transaction.hash, {
            beginning: 6,
            ending: 4,
          })}
        </Link>
        <CopyIcon
          onClick={() => {
            copy(transaction.hash);
            toast<string>('Hash Copied');
          }}
          style={{
            cursor: 'pointer',
            width: 20,
            height: 20,
            marginLeft: 8,
          }}
        />
      </>
    ),
    sender:
      !transaction.sender || transaction.sender === '-' || transaction.sender === 'Multiple' ? (
        <span>{transaction.sender || '-'}</span>
      ) : (
        <Link shallow prefetch={false} href={ACCOUNT_DETAILS(transaction.sender)}>
          {getMiddleEllipsis(transaction?.sender || '', {
            beginning: 4,
            ending: 4,
          })}
        </Link>
      ),
    receiver:
      !transaction.receiver ||
      transaction.receiver === '-' ||
      transaction.receiver === 'Multiple' ? (
        <span>{transaction.receiver || '-'}</span>
      ) : (
        <Link shallow prefetch={false} href={ACCOUNT_DETAILS(transaction.receiver)}>
          {getMiddleEllipsis(transaction?.receiver || '', {
            beginning: 4,
            ending: 4,
          })}
        </Link>
      ),
    amount:
      typeof transaction.amount === 'string' &&
      (transaction.amount === '' || transaction.amount === '-') ? (
        transaction.amount === '' ? (
          <Link shallow prefetch={false} href={TRANSACTION_DETAILS(transaction.hash)}>
            {t('transactions:more')}
          </Link>
        ) : (
          <Typography variant="body1">{transaction.amount}</Typography>
        )
      ) : (
        <div className={classes.amount}>
          {`${formatNumber(transaction.amount?.value, transaction.amount?.exponent, 'whole')}`}
          <span className={classes.decimal}>{`${formatNumber(
            transaction.amount?.value,
            transaction.amount?.exponent,
            'decimal'
          )}`}</span>
          <span
            className={classes.denom}
          >{`${transaction?.amount?.displayDenom?.toUpperCase()}`}</span>
        </div>
      ),
    type: (
      <div>
        <Tag value={transaction.type?.[0] ?? ''} theme="six" />
        {transaction.messages.count > 1 && ` + ${transaction.messages.count - 1}`}
      </div>
    ),
    fee: (
      <div className={classes.amount}>
        {`${formatNumber(transaction.fee?.value, transaction.fee?.exponent, 'whole')}`}
        <span className={classes.decimal}>{`${formatNumber(
          transaction.fee?.value,
          transaction.fee?.exponent,
          'decimal'
        )}`}</span>
        <span className={classes.denom}>{`${transaction?.fee?.displayDenom?.toUpperCase()}`}</span>
      </div>
    ),
    result: <Result success={transaction.success} />,
    time: <ExtendedTimestamp timestamp={transaction.timestamp} flexEnd={false} />,
    messages: numeral(transaction.messages.count).format('0,0'),
  };

  return (
    <div style={style}>
      <div ref={rowRef}>
        <SingleTransactionMobile {...item} />
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

const Mobile: FC<TransactionsListState> = ({
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
