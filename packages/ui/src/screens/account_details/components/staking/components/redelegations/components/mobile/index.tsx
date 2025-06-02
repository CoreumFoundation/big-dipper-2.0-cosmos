import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import AvatarName from '@/components/avatar_name';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { readDate } from '@/recoil/settings';
import useStyles from '@/screens/account_details/components/staking/components/redelegations/components/mobile/styles';
import type { ItemType } from '@/screens/account_details/components/staking/components/redelegations/types';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import { formatNumber } from '@/utils/format_token';

type RedelegationsItemProps = {
  item: ItemType;
  isLast: boolean;
};

const RedelegationsItem: FC<RedelegationsItemProps> = ({ item, isLast }) => {
  const {
    address: fromAddress,
    imageUrl: fromImageUrl,
    name: fromName,
  } = useProfileRecoil(item.from);
  const { address: toAddress, imageUrl: toImageUrl, name: toName } = useProfileRecoil(item.to);
  const { classes } = useStyles();
  const { t } = useTranslation('accounts');
  const dateFormat = useRecoilValue(readDate);
  return (
    <>
      <div className={classes.list}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('from')}
          </Typography>
          <AvatarName
            name={item.overviewTo?.moniker ?? fromName}
            address={fromAddress}
            imageUrl={item.overviewTo?.avatarUrl ?? fromImageUrl}
          />
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('to')}
          </Typography>
          <AvatarName
            name={item.overviewTo?.moniker ?? toName}
            address={toAddress}
            imageUrl={item.overviewTo?.avatarUrl ?? toImageUrl}
          />
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('completionTime')}
          </Typography>
          {formatDayJs(dayjs.utc(item.completionTime), dateFormat)}
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('amount')}
          </Typography>
          {item.amount
            ? `${formatNumber(
                item.amount.value,
                item.amount.exponent
                /// /Kept the "toUpperCase()" in order to show the token symbol in uppercase
              )} ${item.amount.displayDenom.toUpperCase()}`
            : ''}
        </div>
      </div>
      {!isLast && <Divider />}
    </>
  );
};

type MobileProps = {
  className?: string;
  items?: ItemType[];
};

const Mobile: FC<MobileProps> = ({ className, items }) => (
  <div className={className}>
    {items?.map((x, i) => (
      <RedelegationsItem
        // eslint-disable-next-line react/no-array-index-key
        key={`${x.from}-${x.to}-${i}`}
        item={x}
        isLast={!items || i === items.length - 1}
      />
    ))}
  </div>
);

export default Mobile;
