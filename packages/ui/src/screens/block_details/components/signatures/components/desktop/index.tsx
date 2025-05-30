import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, LegacyRef, useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
import {
  columns,
  formatRows,
} from '@/screens/block_details/components/signatures/components/desktop/utils';
import useStyles from '@/screens/block_details/components/signatures/components/desktop/styles';
import useShallowMemo from '@/hooks/useShallowMemo';
import { useGrid } from '@/hooks/use_react_window';

type DesktopProps = {
  className?: string;
  signatures: { address: string; moniker: string }[];
};

const Desktop: FC<DesktopProps> = ({ className, signatures }) => {
  const { t } = useTranslation('blocks');
  const { classes, cx } = useStyles();
  const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);
  const signaturesMemo = useShallowMemo(signatures);
  const rows = useMemo(() => formatRows(signaturesMemo), [signaturesMemo]);

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
                  <div style={{ ...style }} className={cx(classes.cell, classes.headerCell)}>
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
            <Grid
              ref={gridRef as LegacyRef<Grid>}
              columnCount={columns.length}
              columnWidth={(index) => getColumnWidth(width, index)}
              height={height - 50}
              rowCount={rows.length}
              rowHeight={getRowHeight}
              width={width}
            >
              {({ columnIndex, rowIndex, style }) => {
                const { key, align } = columns[columnIndex];
                const selectedItem = rows[rowIndex][key as keyof (typeof rows)[number]];

                return (
                  <div
                    style={style}
                    className={cx(classes.cell, classes.body, {
                      odd: !(rowIndex % 2),
                    })}
                  >
                    <Typography
                      variant="body1"
                      align={align}
                      component="div"
                      className={classes.cellItem}
                    >
                      {selectedItem}
                    </Typography>
                  </div>
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
