import AvatarName from '@/components/avatar_name';
import Timestamp from '@/components/Timestamp';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import useStyles from '@/screens/home/components/blocks/components/desktop/styles';
import { columns } from '@/screens/home/components/blocks/components/desktop/utils';
import type { ItemType } from '@/screens/home/components/blocks/types';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@/utils/go_to_page';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import numeral from 'numeral';
import { FC } from 'react';

type BlockRowProps = {
  item: ItemType;
};

const variants: Variants = {
  initial: {
    height: 50,
    display: 'inline-flex',
    alignItems: 'center',
    overflow: 'hidden',
    clipPath: 'inset(0 50 0 50)',
  },
};

const BlockRow: FC<BlockRowProps> = ({ item }) => {
  const { name, address, imageUrl } = useProfileRecoil(item.proposer);

  const formattedData = {
    height: (
      <Link shallow prefetch={false} href={BLOCK_DETAILS(item.height)} className="value">
        {numeral(item.height).format('0,0')}
      </Link>
    ),
    txs: numeral(item.txs).format('0,0'),
    time: <Timestamp timestamp={item.timestamp} />,
    proposer: (
      <AvatarName
        address={address}
        imageUrl={item.avatarUrl ?? imageUrl}
        name={item.moniker || name}
      />
    ),
    hash: getMiddleEllipsis(item.hash, {
      beginning: 6,
      ending: 5,
    }),
  };
  return (
    <TableRow>
      {columns.map((column) => {
        const { key, align, width } = column;
        return (
          <TableCell key={`${item.hash}-${key}`} align={align} style={{ width: `${width}%` }}>
            <motion.div key={`${item.hash}-${key}`} initial="initial" variants={variants}>
              {formattedData[key as keyof typeof formattedData]}
            </motion.div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

type DesktopProps = {
  className?: string;
  items: ItemType[];
};

const Desktop: FC<DesktopProps> = ({ className, items }) => {
  const { t } = useTranslation('blocks');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                className={classes.header}
                style={{ width: `${column.width}%` }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <BlockRow key={row.hash} item={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
