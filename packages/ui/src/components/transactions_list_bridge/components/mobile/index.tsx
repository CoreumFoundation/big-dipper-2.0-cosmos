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
import { ACCOUNT_DETAILS, formatToken, getMiddleEllipsis, TRANSACTION_DETAILS } from '@/utils';
import { Tooltip, Zoom } from '@mui/material';
import Link from 'next/link';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import Big from 'big.js';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  isItemLoaded: ((index: number) => boolean) | undefined;
  transaction: TransactionsListBridgeState['transactions'][number];
  isLast: boolean;
  assets: Asset[];
  metadatas: any[];
};

const ListItem: FC<ListItemProps> = ({
  index,
  style,
  setRowHeight,
  isItemLoaded,
  transaction,
  isLast,
  assets,
  metadatas,
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

  const asset = metadatas.find(
    (item: any) => item.base.toLowerCase() === transaction.coin.denom.toLowerCase()
  );

  let amount = formatToken(transaction.coin.amount, transaction.coin.denom).value;

  if (asset?.denom_units[1].exponent) {
    const availableValue = new Big(+transaction.coin.amount)
      .div(Big(10).pow(asset?.denom_units[1].exponent))
      .toFixed(asset?.denom_units[1].exponent);

    amount = formatNumberWithThousandsSeparator(availableValue);
  }

  const tokenInAssets = assets.find(
    (assetItem: any) => transaction.coin.denom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  let displayDenom = asset?.display.toUpperCase() || transaction.coin.denom.toUpperCase();
  if (tokenInAssets && tokenInAssets?.extra.xrpl_info) {
    displayDenom =
      tokenInAssets?.extra.xrpl_info.currency.length === 40
        ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
        : tokenInAssets?.extra.xrpl_info.currency;
  }

  let parsedAmount = `${amount} ${displayDenom}`;

  if (tokenInAssets) {
    if (transaction.coin.denom.includes('ibc')) {
      const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
      const availableValue = new Big(+transaction.coin.amount)
        .div(Big(10).pow(tokenInAssets.extra.ibc_info!.precision))
        .toFixed(tokenInAssets.extra.ibc_info!.precision);
      amount = formatNumberWithThousandsSeparator(availableValue);

      parsedAmount = `${amount} ${tokenDenom}`;
    }
  }

  const item = {
    route: <div>{transaction.source}</div>,
    amount: <div>{parsedAmount}</div>,
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
  assets,
  metadatas,
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
                    assets={assets}
                    metadatas={metadatas}
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
