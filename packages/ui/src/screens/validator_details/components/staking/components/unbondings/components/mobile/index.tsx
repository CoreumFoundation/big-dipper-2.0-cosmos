import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import AvatarName from '@/components/avatar_name';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { readDate } from '@/recoil/settings';
import useStyles from '@/screens/validator_details/components/staking/components/unbondings/components/mobile/styles';
import type { ItemType } from '@/screens/validator_details/components/staking/components/unbondings/types';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import { formatNumber } from '@/utils/format_token';

type UnbondingsItemProps = {
  i: number;
  item: ItemType;
  isLast: boolean;
};

const UnbondingsItem: FC<UnbondingsItemProps> = ({ i, item, isLast }) => {
  const { name, address, imageUrl } = useProfileRecoil(item.address);
  const { classes } = useStyles();
  const { t } = useTranslation('accounts');
  const dateFormat = useRecoilValue(readDate);
  return (
    <Fragment key={`votes-mobile-${i}`}>
      <div className={classes.list}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('address')}
          </Typography>
          <AvatarName address={address} imageUrl={imageUrl} name={name} />
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
                // Kept the "toUpperCase()" in order to show the token symbol in uppercase
              )} ${item.amount.displayDenom.toUpperCase()}`
            : ''}
        </div>
      </div>
      {!isLast && <Divider />}
    </Fragment>
  );
};

type MobileProps = {
  className?: string;
  items: ItemType[];
};

const Mobile: FC<MobileProps> = ({ className, items }) => (
  <div className={className}>
    {items?.map((x, i) => (
      <UnbondingsItem
        // eslint-disable-next-line react/no-array-index-key
        key={`${x.address}-${i}`}
        i={i}
        item={x}
        isLast={!items || i === items.length - 1}
      />
    ))}
  </div>
);

export default Mobile;
