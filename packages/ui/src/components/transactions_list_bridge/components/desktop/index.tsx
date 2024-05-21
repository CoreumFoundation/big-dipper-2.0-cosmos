/* eslint-disable no-nested-ternary */
import Loading from '@/components/loading';
import useStyles from '@/components/transactions_list_bridge/components/desktop/styles';
import { columns } from '@/components/transactions_list_bridge/components/desktop/utils';
import type { TransactionsListBridgeState } from '@/components/transactions_list_bridge/types';
import { useGrid } from '@/hooks/use_react_window';
import { mergeRefs } from '@/utils/merge_refs';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ExtendedTimestamp from '@/components/ExtendedTimestamp';
import { ACCOUNT_DETAILS, getMiddleEllipsis, TRANSACTION_DETAILS } from '@/utils';
import Link from 'next/link';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

const Desktop: FC<TransactionsListBridgeState> = ({
  className,
  itemCount,
  loadMoreItems,
  hasNextPage,
  isNextPageLoading,
  isItemLoaded,
  transactions,
}) => {
  const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);

  const { classes, cx } = useStyles();
  const { t } = useTranslation('transactions');

  const items = transactions.map((x) => ({
    route: <div>{x.route}</div>,
    amount: <div>{x.amount}</div>,
    txHash_1: (
      <Tooltip TransitionComponent={Zoom} title={<pre>{x.txHash_1}</pre>} placement="bottom" arrow>
        <Link shallow prefetch={false} href={TRANSACTION_DETAILS(x.txHash_1)}>
          {getMiddleEllipsis(x?.txHash_1 || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    txHash_2: (
      <Tooltip TransitionComponent={Zoom} title={<pre>{x.txHash_2}</pre>} placement="bottom" arrow>
        <Link shallow prefetch={false} href={TRANSACTION_DETAILS(x.txHash_2)}>
          {getMiddleEllipsis(x?.txHash_2 || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    destination: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{x.destination}</pre>}
        placement="bottom"
        arrow
      >
        <Link shallow prefetch={false} href={ACCOUNT_DETAILS(x.destination)}>
          {getMiddleEllipsis(x?.destination || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    time: <ExtendedTimestamp timestamp={x.timestamp} />,
  }));

  if (itemCount < 10 && hasNextPage && !isNextPageLoading && loadMoreItems) {
    loadMoreItems();
  }

  return (
    <div className={cx(classes.root, className)}>
      <AutoSizer onResize={onResize}>
        {({ height, width }) => (
          <>
            {/* ======================================= */}
            {/* Table Header */}
            {/* ======================================= */}
            <Grid
              ref={columnRef as LegacyRef<Grid>}
              columnCount={columns.length}
              columnWidth={(index) => getColumnWidth(width, index)}
              height={50}
              rowCount={1}
              rowHeight={() => 50}
              width={width}
            >
              {({ columnIndex, style }) => {
                const { key, align } = columns[columnIndex];

                return (
                  <div style={style} className={classes.header}>
                    <Typography variant="h4" align={align}>
                      {t(key)}
                    </Typography>
                  </div>
                );
              }}
            </Grid>
            {/* ======================================= */}
            {/* Table Body */}
            {/* ======================================= */}
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
                <Grid
                  onItemsRendered={({
                    visibleRowStartIndex,
                    visibleRowStopIndex,
                    overscanRowStopIndex,
                    overscanRowStartIndex,
                  }) => {
                    onItemsRendered({
                      overscanStartIndex: overscanRowStartIndex,
                      overscanStopIndex: overscanRowStopIndex,
                      visibleStartIndex: visibleRowStartIndex,
                      visibleStopIndex: visibleRowStopIndex,
                    });
                  }}
                  ref={mergeRefs(gridRef, ref)}
                  columnCount={columns.length}
                  columnWidth={(index) => getColumnWidth(width, index)}
                  height={height - 50}
                  rowCount={itemCount}
                  rowHeight={getRowHeight}
                  width={width}
                  className="scrollbar"
                  style={{ overflowX: 'hidden' }}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    if (
                      !isItemLoaded?.(rowIndex) &&
                      columnIndex === 0
                      // rowIndex < transactions.length
                    ) {
                      return (
                        <div
                          style={{
                            ...style,
                            width,
                          }}
                        >
                          <Loading />
                        </div>
                      );
                    }

                    if (!isItemLoaded?.(rowIndex)) {
                      return null;
                    }

                    const { key, align } = columns[columnIndex];
                    const item = items[rowIndex][key as keyof (typeof items)[number]];
                    return (
                      <div
                        style={style}
                        className={cx(classes.cell, classes.body, {
                          odd: !(rowIndex % 2),
                        })}
                      >
                        <Typography variant="body1" align={align} component="div">
                          {item}
                        </Typography>
                      </div>
                    );
                  }}
                </Grid>
              )}
            </InfiniteLoader>
          </>
        )}
      </AutoSizer>
    </div>
  );
};

export default Desktop;
