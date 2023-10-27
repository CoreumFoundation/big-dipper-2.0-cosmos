import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { ComponentProps, CSSProperties, FC, LegacyRef, ReactNode } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
// import AvatarName from '@/components/avatar_name';
// import InfoPopover from '@/components/info_popover';
import SortArrows from '@/components/sort_arrows';
import { useGrid } from '@/hooks/use_react_window';
import useStyles from '@/screens/assets/components/list/components/desktop/styles';
import { fetchColumns } from '@/screens/assets/components/list/components/desktop/utils';
import { AssetFTType } from '@/screens/assets/components/list/types';
import numeral from 'numeral';
import { PriceChangeChart } from './components/PriceChangeChart';

type GridColumnProps = {
  column: ReturnType<typeof fetchColumns>[number];
  sortDirection: 'desc' | 'asc';
  sortKey: string;
  handleSort: (key: string) => void;
  style: CSSProperties;
  items?: AssetFTType[];
};

const GridColumn: FC<GridColumnProps> = ({
  column,
  sortKey,
  sortDirection,
  handleSort,
  style,
  items,
}) => {
  const { t } = useTranslation('assets');
  const { classes, cx } = useStyles();

  const { key, align, component, sort, sortKey: sortingKey } = column;

  return (
    <div
      style={style}
      className={cx(classes.cell, classes.header, {
        [classes.flexCells]: !!component || sort,
        [align ?? '']: sort || !!component,
        sort,
      })}
      onClick={() => (sort ? handleSort(sortingKey ?? '') : null)}
      role="button"
      tabIndex={0}
      aria-label={t(key) ?? undefined}
    >
      {component || (
        <Typography variant="h4" align={align}>
          {t(key)}
          {!!sort && items && items.length > 1 && (
            <SortArrows sort={sortKey === sortingKey ? sortDirection : undefined} />
          )}
        </Typography>
      )}
    </div>
  );
};

type GridRowProps = {
  column: string;
  style: CSSProperties;
  rowIndex: number;
  align?: ComponentProps<typeof Typography>['align'];
  item: AssetFTType;
  i: number;
};

const GridRow: FC<GridRowProps> = ({ column, style, rowIndex, align, item, i }) => {
  const { classes, cx } = useStyles();
  const supply = numeral(item.supply).format('0,0');
  const marketCap = numeral(+item.supply * +item.price).format('0,0.00');
  const holders = numeral(item.holders).format('0,0');
  const colorToFill = +item.price_change >= 0 ? '#25D695' : '#FF9595';
  const id = `chart-${item.id}`;

  let formatItem: ReactNode | null = null;
  switch (column) {
    case 'id':
      formatItem = `#${i + 1}`;
      break;
    case 'name':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.nameBlock}>
            <div className={classes.assetLogo}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7162_2200)">
                  <rect width="32" height="32" rx="16" fill="#25D695" />
                  <path
                    d="M16.0014 13.4399C15.4951 13.4399 15.0001 13.5901 14.5791 13.8714C14.1582 14.1527 13.83 14.5525 13.6363 15.0203C13.4425 15.4881 13.3918 16.0028 13.4906 16.4994C13.5894 16.996 13.8332 17.4521 14.1912 17.8101C14.5492 18.1682 15.0054 18.412 15.502 18.5108C15.9986 18.6095 16.5133 18.5588 16.9811 18.3651C17.4489 18.1713 17.8487 17.8432 18.13 17.4222C18.4113 17.0012 18.5614 16.5063 18.5614 15.9999C18.5614 15.321 18.2917 14.6698 17.8116 14.1897C17.3315 13.7097 16.6804 13.4399 16.0014 13.4399Z"
                    fill="white"
                  />
                  <path
                    d="M16.0007 5.76002C14.6557 5.75836 13.3237 6.02245 12.081 6.53712C10.8384 7.05179 9.70971 7.80689 8.75977 8.75906L12.3822 12.3815C13.098 11.6649 14.0103 11.1768 15.0036 10.9788C15.9969 10.7808 17.0267 10.8819 17.9625 11.2693C18.8984 11.6566 19.6983 12.3129 20.2612 13.155C20.824 13.9971 21.1244 14.9872 21.1244 16C21.1244 17.0129 20.824 18.003 20.2612 18.8451C19.6983 19.6872 18.8984 20.3434 17.9625 20.7308C17.0267 21.1181 15.9969 21.2192 15.0036 21.0213C14.0103 20.8233 13.098 20.3351 12.3822 19.6186L8.75977 23.241C9.95053 24.4317 11.4166 25.3104 13.028 25.7991C14.6395 26.2879 16.3466 26.3718 17.9982 26.0432C19.6498 25.7147 21.1949 24.9839 22.4966 23.9156C23.7983 22.8473 24.8164 21.4745 25.4609 19.9187C26.1053 18.363 26.3561 16.6723 26.1911 14.9965C26.026 13.3206 25.4503 11.7113 24.5147 10.3112C23.5792 8.91098 22.3128 7.76313 20.8277 6.96928C19.3426 6.17543 17.6847 5.76008 16.0007 5.76002Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7162_2200">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={classes.nameColumn}>
              <div className={classes.name}>{item.name}</div>
              <div className={classes.chainRow}>
                CORE
                <div className={classes.nameChain}>Chain</div>
              </div>
            </div>
          </div>
        </Typography>
      );
      break;
    case 'token_type':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.tokenTypeBlock}>
            <div className={classes.tokenType}>{item.token_type}</div>
          </div>
        </Typography>
      );
      break;
    case 'price':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.priceBlock}>
            $ {item.price}
            <div
              className={cx(classes.priceChange, {
                up: +item.price_change > 0,
                down: +item.price_change < 0,
              })}
            >
              {item.price_change}%
            </div>
          </div>
        </Typography>
      );
      break;
    case 'supply':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.supply}>{supply}</div>
        </Typography>
      );
      break;
    case 'market_cap':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.marketCap}>$ {marketCap}</div>
        </Typography>
      );
      break;
    case 'holders':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.holders}>{holders}</div>
        </Typography>
      );
      break;
    case 'last7Days':
      formatItem = (
        <PriceChangeChart
          data={item.price_changes_7days}
          predefinedColor={colorToFill as string}
          id={id}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div
      style={style}
      className={cx(classes.cell, classes.body, {
        odd: !(rowIndex % 2),
      })}
    >
      {formatItem}
    </div>
  );
};

type DesktopProps = {
  className?: string;
  sortDirection: 'desc' | 'asc';
  sortKey: string;
  handleSort: (key: string) => void;
  items: AssetFTType[];
};

const Desktop: FC<DesktopProps> = (props) => {
  const { classes, cx } = useStyles();
  const columns = fetchColumns();
  const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);

  return (
    <div className={cx(classes.root, props.className)}>
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
              {({ columnIndex, style }) => (
                <GridColumn
                  column={columns[columnIndex]}
                  sortKey={props.sortKey}
                  sortDirection={props.sortDirection}
                  handleSort={props.handleSort}
                  style={style}
                  items={props.items}
                />
              )}
            </Grid>
            {/* ======================================= */}
            {/* Table Body */}
            {/* ======================================= */}
            <Grid
              ref={gridRef as LegacyRef<Grid>}
              columnCount={columns.length}
              columnWidth={(index) => getColumnWidth(width, index)}
              height={height - 50}
              rowCount={props.items.length}
              rowHeight={getRowHeight}
              width={width}
              className="scrollbar"
              style={{ overflowX: 'hidden' }}
            >
              {({ columnIndex, rowIndex, style }) => {
                const { key, align } = columns[columnIndex];
                const item = props.items[rowIndex];
                if (!item?.id) return null;

                return (
                  <GridRow
                    key={item.id}
                    column={key}
                    style={style}
                    rowIndex={rowIndex}
                    align={align}
                    item={item}
                    i={rowIndex}
                  />
                );
              }}
            </Grid>
          </>
        )}
      </AutoSizer>
    </div>
  );
};

export default Desktop;
