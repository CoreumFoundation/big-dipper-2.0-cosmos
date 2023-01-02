import { useStyles } from '@/screens/home/components/blocks/components/desktop/styles';
import { columns } from '@/screens/home/components/blocks/components/desktop/utils';
import type { BlockType } from '@/screens/home/components/blocks/types';
import dayjs from '@/utils/dayjs';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@/utils/go_to_page';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import numeral from 'numeral';
import React, { FC } from 'react';

type DesktopProps = {
  className?: string;
  items: BlockType[];
};

const Desktop: FC<DesktopProps> = ({ className, items }) => {
  const { t } = useTranslation('blocks');
  const classes = useStyles();

  const formattedData = items.map((x) => ({
    key: `${x.height}-${x.timestamp}`,
    height: (
      <Link href={BLOCK_DETAILS(x.height)} passHref>
        <Typography variant="body1" className="value" component="a">
          {numeral(x.height).format('0,0')}
        </Typography>
      </Link>
    ),
    txs: numeral(x.txs).format('0,0'),
    time: dayjs.utc(x.timestamp).fromNow(),
    hash: getMiddleEllipsis(x.hash, {
      beginning: 15,
      ending: 15,
    }),
  }));

  return (
    <div className={classnames(className, classes.root)}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align}>
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.map((row) => (
            <TableRow key={row.key}>
              {columns.map((column) => {
                const { key, align } = column;
                const item = row[key as keyof typeof row];
                return (
                  <TableCell key={`${row.key}-${key}`} align={align}>
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;