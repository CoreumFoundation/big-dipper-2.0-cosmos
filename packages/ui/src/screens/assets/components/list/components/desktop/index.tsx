import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { ComponentProps, CSSProperties, FC, LegacyRef, ReactNode } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
import SortArrows from '@/components/sort_arrows';
import { useGrid } from '@/hooks/use_react_window';
import useStyles from '@/screens/assets/components/list/components/desktop/styles';
import { fetchColumns } from '@/screens/assets/components/list/components/desktop/utils';
import numeral from 'numeral';
import Image from 'next/image';
import { ASSETS_DETAILS } from '@/utils/go_to_page';
import { useRouter } from 'next/router';
import { getFormatString } from '@/utils/format_token';

type GridColumnProps = {
  column: ReturnType<typeof fetchColumns>[number];
  sortDirection: 'desc' | 'asc';
  sortKey: string;
  handleSort: (key: string) => void;
  style: CSSProperties;
  items?: any[];
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
  item: any;
  i: number;
};

const GridRow: FC<GridRowProps> = ({ column, style, rowIndex, align, item, i }) => {
  const { classes, cx } = useStyles();
  const router = useRouter();

  const value = item.supply / 10 ** item.exponent;
  let supply = numeral(value).format(getFormatString(item.exponent));

  if (Number(value) < 1) {
    supply = value.toFixed(item.exponent);
  }

  const holders = numeral(item.holders).format('0,0');

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
              {item.logo_URIs.svg || item.logo_URIs.png ? (
                <Image
                  src={item.logo_URIs.svg || item.logo_URIs.png}
                  alt={item.denom}
                  width={32}
                  height={32}
                />
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_8758_4819)">
                    <rect width="32" height="32" rx="16" fill="url(#paint0_linear_8758_4819)" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.3696 10.1001C19.5365 9.42686 20.3087 8.33279 20.6046 7.12064C19.2048 6.39606 17.6313 6 16.0003 6C14.3693 6 12.7946 6.39664 11.3945 7.1215C11.4989 7.54817 11.665 7.96732 11.8959 8.36714C13.2044 10.6315 16.1029 11.4075 18.3696 10.1001ZM6 15.5436C7.19869 15.8937 8.5332 15.7731 9.7001 15.0999C11.9669 13.7925 12.7436 10.897 11.4348 8.63268C11.2039 8.23315 10.9234 7.87981 10.6052 7.57642C9.27848 8.42397 8.14885 9.58617 7.33335 10.9949L7.33046 11.0001L7.32439 11.0105C6.51323 12.4184 6.07167 13.9743 6 15.5436ZM26.0006 16.4563C25.9286 18.0293 25.485 19.589 24.6698 20.9998C23.8543 22.4108 22.7233 23.5748 21.3951 24.4235C21.0769 24.1201 20.7963 23.7667 20.5654 23.3669C19.2567 21.1026 20.0334 18.2071 22.3002 16.9C23.4671 16.2268 24.8019 16.1059 26.0006 16.4563ZM16.0008 26C17.6318 26 19.2065 25.6034 20.6063 24.8785C20.5022 24.4516 20.3361 24.0324 20.1052 23.6326C18.7964 21.3685 15.8979 20.5926 13.6312 21.9C12.4643 22.5732 11.6921 23.6673 11.3965 24.8791C12.796 25.6037 14.3701 26 16.0005 26H16.0008ZM10.6055 24.4236C9.27732 23.5746 8.14654 22.411 7.33104 21.0002V20.9996C6.51525 19.5886 6.07167 18.0286 6 16.4553C8.04973 15.8546 10.3197 16.703 11.4351 18.6328C12.5506 20.5626 12.1512 22.9508 10.6055 24.4236ZM20.5653 13.3672C21.6807 15.297 23.951 16.1457 26.0007 15.5447C25.929 13.9714 25.4851 12.4112 24.6696 10.9998L24.6656 10.9929C23.8504 9.58502 22.7211 8.42339 21.3949 7.57642C19.8495 9.04924 19.4501 11.4374 20.5653 13.3672Z"
                      fill="url(#paint1_linear_8758_4819)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_8758_4819"
                      x1="27.9808"
                      y1="27.9808"
                      x2="3.11788"
                      y2="3.11454"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#2A2F35" />
                      <stop offset="0.99" stopColor="#324254" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_8758_4819"
                      x1="6"
                      y1="6"
                      x2="26"
                      y2="26"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="#666666" />
                    </linearGradient>
                    <clipPath id="clip0_8758_4819">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div className={classes.nameColumn}>
              <div className={classes.name}>{item.display}</div>
              <div className={classes.chainRow}>
                <div className={classes.nameChain}>Chain: {item.chain}</div>
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
            <div className={classes.tokenType}>{item.tokenType.toUpperCase()}</div>
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
    case 'holders':
      formatItem = (
        <Typography variant="body1" align={align} component="div">
          <div className={classes.holders}>{holders}</div>
        </Typography>
      );
      break;
    default:
      break;
  }

  const styles = {
    ...style,
    cursor: 'pointer',
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={() => router.push(ASSETS_DETAILS(item.denom))}
      style={styles}
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
  items: any[];
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
