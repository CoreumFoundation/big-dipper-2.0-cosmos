import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import numeral from 'numeral';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import BoxDetails from '@/screens/transaction_details/components/overview/components/box_details';
import Result from '@/components/result';
import { readDate } from '@/recoil/settings';
import useStyles from '@/screens/transaction_details/components/overview/styles';
import type { OverviewType } from '@/screens/transaction_details/types';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import { formatNumber } from '@/utils/format_token';
import { BLOCK_DETAILS } from '@/utils/go_to_page';
import { Typography } from '@mui/material';

type OverviewProps = {
  className?: string;
  data: OverviewType;
};

const Overview: FC<OverviewProps> = ({ className, data }) => {
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();
  const dateFormat = useRecoilValue(readDate);

  const details = [
    {
      key: 'hash',
      label: t('hash'),
      detail: data.hash,
      fullWidth: true,
    },
    {
      key: 'height',
      label: t('height'),
      detail: (
        <Link shallow href={BLOCK_DETAILS(data.height)} className="value">
          {numeral(data.height).format('0,0')}
        </Link>
      ),
      fullWidth: false,
    },
    {
      key: 'time',
      label: t('time'),
      detail: formatDayJs(dayjs.utc(data.timestamp), dateFormat),
      fullWidth: false,
    },
    {
      key: 'fee',
      label: t('fee'),
      detail: `${formatNumber(
        data.fee.value,
        data.fee.exponent
      )} ${data?.fee?.displayDenom.toUpperCase()}`,
      fullWidth: false,
    },
    {
      key: 'gas',
      label: t('gas'),
      detail: `${numeral(data.gasUsed).format('0,0.[00]')} / ${numeral(data.gasWanted).format(
        '0,0.[00]'
      )}`,
      fullWidth: false,
    },
    {
      key: 'result',
      label: t('result'),
      detail: <Result success={data.success} />,
      fullWidth: false,
    },
    {
      className: 'memo',
      key: 'memo',
      label: t('memo'),
      detail: data.memo,
      fullWidth: false,
    },
  ];

  if (!data.success) {
    details.push({
      className: 'memo',
      key: 'error',
      label: t('error'),
      detail: data.error,
      fullWidth: false,
    });
  }

  return (
    <BoxDetails
      className={cx(classes.root, className)}
      title={<Typography variant="h2">{t('overview')}</Typography>}
      details={details}
    />
  );
};

export default Overview;
