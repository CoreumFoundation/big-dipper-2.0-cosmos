/* eslint-disable no-nested-ternary */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { formatNumber } from '@/utils/format_token';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import type { ItemType } from '@/screens/proposal_details/components/deposits/types';
import { columns } from '@/screens/proposal_details/components/deposits/components/desktop/utils';
import { readDate } from '@/recoil/settings';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import AvatarName from '@/components/avatar_name';

type DepositsRowProps = {
  i: number;
  item: ItemType;
};

const DepositsRow: FC<DepositsRowProps> = ({ i, item }) => {
  const dateFormat = useRecoilValue(readDate);
  const { name, address, imageUrl } = useProfileRecoil(item.user);

  return (
    <TableRow key={`depositors-mobile-${i}`}>
      {columns.map((column) => (
        <TableCell
          // eslint-disable-next-line react/no-array-index-key
          key={`holders-row-${i}-${column.key}`}
          align={column.align}
          style={{ width: `${column.width}%` }}
        >
          {column.key === 'depositor' ? (
            address ? (
              <AvatarName address={address} imageUrl={imageUrl} name={name} />
            ) : (
              <>-</>
            )
          ) : column.key === 'amount' ? (
            item.amount ? (
              `${formatNumber(
                item.amount.value,
                item.amount.exponent
                // Kept the "toUpperCase()" in order to show the token symbol in uppercase
              )} ${item.amount.displayDenom.toUpperCase()}`
            ) : (
              ''
            )
          ) : column.key === 'time' ? (
            formatDayJs(dayjs.utc(item.timestamp), dateFormat)
          ) : null}
        </TableCell>
      ))}
    </TableRow>
  );
};

type DesktopProps = {
  className?: string;
  items?: ItemType[];
};

const Desktop: FC<DesktopProps> = ({ className, items }) => {
  const { t } = useTranslation('proposals');

  return (
    <div className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                style={{ width: `${column.width}%` }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((row, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <DepositsRow key={i} i={i} item={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
