import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { formatNumber, getFormatString } from '@/utils/format_token';
import type { OtherTokenType } from '@/screens/account_details/types';
import { columns } from '@/screens/account_details/components/other_tokens/components/desktop/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ASSETS_DETAILS } from '@/utils/go_to_page';
import numeral from 'numeral';
import Big from 'big.js';
import useStyles from './styles';

type DesktopProps = {
  className?: string;
  items?: OtherTokenType[];
};

export const formatNumberWithThousandsSeparator = (inputString: string): string => {
  const parts = inputString.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart) {
    return `${formattedIntegerPart}.${decimalPart}`;
  }

  return formattedIntegerPart;
};

const Desktop: FC<DesktopProps> = ({ className, items }) => {
  const { t } = useTranslation('accounts');
  const { classes, cx } = useStyles();
  const router = useRouter();

  const formattedItems = items?.map((x, i) => {
    let available = x.exponent
      ? numeral(+x.available.value / 10 ** x.exponent).format(getFormatString(x.exponent))
      : formatNumber(x.available.value, x.available.exponent);

    if (Number(x.available.value) > Number.MAX_SAFE_INTEGER && x.exponent) {
      const ratio = Big(10 ** x.exponent);
      const value = Big(x.available.value).div(ratio).toFixed(x.exponent).toString();

      available = formatNumberWithThousandsSeparator(value);
    }

    return {
      key: i,
      token: x.denom,
      commission: formatNumber(x.commission.value, x.commission.exponent),
      available,
      reward: x.reward ? formatNumber(x.reward.value, x.reward.exponent) : '',
      ...(x.logoURL && { logo: x.logoURL }),
      ...(x.displayName && { displayName: x.displayName }),
      ...(x.chain && { chain: x.chain }),
      exponent: x.exponent,
    };
  });

  const handleNavigateToAsset = (denom: string) => {
    router.push(ASSETS_DETAILS(denom));
  };

  return (
    <div className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                style={{ width: `${column.width}%`, maxWidth: `${column.width}%` }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedItems?.map((row) => (
            <TableRow
              key={`holders-row-${row.key}`}
              onClick={() => row.logo && handleNavigateToAsset(row.token)}
              className={cx(classes.tableRow, row.logo && classes.tableRegisteredAsset)}
            >
              {columns.map((column) => {
                if (column.key === 'token' && row.displayName && row.chain) {
                  return (
                    <TableCell
                      key={`holders-row-${row.key}-${column.key}`}
                      align={column.align}
                      style={{
                        width: `${column.width}%`,
                        maxWidth: `${column.width}%`,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <div className={classes.nameBlock}>
                        {row.logo && (
                          <div className={classes.assetLogo}>
                            <Image src={row.logo} alt={row.token} width={24} height={24} />
                          </div>
                        )}
                        <div className={classes.nameColumn}>
                          <div className={classes.name}>{row.displayName}</div>
                          {!row.logo && <div className={classes.denom}>{row.token}</div>}
                          <div className={classes.chainRow}>
                            <div className={classes.nameChain}>Chain: {row.chain}</div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  );
                }

                return (
                  <TableCell
                    key={`holders-row-${row.key}-${column.key}`}
                    align={column.align}
                    style={{
                      width: `${column.width}%`,
                      maxWidth: `${column.width}%`,
                      paddingTop: 20,
                      paddingBottom: 20,
                      wordBreak: 'break-word',
                    }}
                  >
                    {row[column.key as keyof typeof row]}
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
