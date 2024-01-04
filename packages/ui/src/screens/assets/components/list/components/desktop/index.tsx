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

  const supply = numeral(item.supply).format('0,0');
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
              <Image src={item.logo_URIs.svg} alt={item.denom} width={32} height={32} />
            </div>
            <div className={classes.nameColumn}>
              <div className={classes.name}>{item.display}</div>
              <div className={classes.chainRow}>
                <div className={classes.nameChain}>Chain: Coreum</div>
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
              height={78}
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
