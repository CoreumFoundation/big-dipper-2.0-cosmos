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
import type { ItemType } from '@/screens/account_details/components/staking/components/unbondings/types';
import { columns } from '@/screens/account_details/components/staking/components/unbondings/components/desktop/utils';
import { readDate } from '@/recoil/settings';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import AvatarName from '@/components/avatar_name';

type UnbondingsRowProps = {
  item: ItemType;
};

const UnbondingsRow: FC<UnbondingsRowProps> = ({ item }) => {
  const { name, address, imageUrl } = useProfileRecoil(item.validator);
  const dateFormat = useRecoilValue(readDate);
  const formattedItem = {
    validator: (
      <AvatarName
        name={item.overview?.moniker ?? name}
        address={address}
        imageUrl={item.overview?.avatarUrl ?? imageUrl}
      />
    ),
    amount: item.amount
      ? `${formatNumber(
          item.amount.value,
          item.amount.exponent
          // Kept the "toUpperCase()" in order to show the token symbol in uppercase
        )} ${item.amount.displayDenom.toUpperCase()}`
      : '',
    completionTime: formatDayJs(dayjs.utc(item.completionTime), dateFormat),
  };
  return (
    <TableRow>
      {columns.map((column) => {
        const selected = formattedItem[column.key as keyof typeof formattedItem];
        return (
          <TableCell
            key={`${item.validator}-${column.key}`}
            align={column.align}
            style={{ width: `${column.width}%` }}
          >
            {selected}
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
  const { t } = useTranslation('accounts');
  return (
    <div className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                style={{
                  width: `${column.width}%`,
                  color: '#6C6F78',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((row, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <UnbondingsRow key={`${row.validator}-${i}`} item={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
