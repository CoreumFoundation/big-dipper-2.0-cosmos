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
import type { ItemType } from '@/screens/account_details/components/staking/components/redelegations/types';
import { columns } from '@/screens/account_details/components/staking/components/redelegations/components/desktop/utils';
import { readDate } from '@/recoil/settings';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import AvatarName from '@/components/avatar_name';

type RedelegationsRowProps = {
  item: ItemType;
  i: number;
};

const RedelegationsRow: FC<RedelegationsRowProps> = ({ item, i }) => {
  const {
    address: fromAddress,
    imageUrl: fromImageUrl,
    name: fromName,
  } = useProfileRecoil(item.from);
  const { address: toAddress, imageUrl: toImageUrl, name: toName } = useProfileRecoil(item.to);
  const dateFormat = useRecoilValue(readDate);
  const formattedItem = {
    identifier: i,
    to: (
      <AvatarName
        name={item.overviewTo?.moniker ?? toName}
        address={toAddress}
        imageUrl={item.overviewTo?.avatarUrl ?? toImageUrl}
      />
    ),
    from: (
      <AvatarName
        name={item.overviewTo?.moniker ?? fromName}
        address={fromAddress}
        imageUrl={item.overviewTo?.avatarUrl ?? fromImageUrl}
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
      {columns.map((column) => (
        <TableCell
          key={`holders-row-${i}-${column.key}`}
          align={column.align}
          style={{ width: `${column.width}%` }}
        >
          {formattedItem[column.key as keyof typeof formattedItem]}
        </TableCell>
      ))}
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
            <RedelegationsRow key={`${row.from}-${row.to}-${i}`} i={i} item={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
