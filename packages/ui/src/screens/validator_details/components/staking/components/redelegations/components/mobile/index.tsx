import AvatarName from '@/components/avatar_name';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { readDate } from '@/recoil/settings';
import { useStyles } from '@/screens/validator_details/components/staking/components/redelegations/components/mobile/styles';
import type { ItemType } from '@/screens/validator_details/components/staking/components/redelegations/types';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import { formatNumber } from '@/utils/format_token';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, Fragment } from 'react';
import { useRecoilValue } from 'recoil';

type RedelegationsItemProps = {
  i: number;
  item: ItemType;
  isLast: boolean;
};

const RedelegationsItem: FC<RedelegationsItemProps> = ({ i, item, isLast }) => {
  const { address, imageUrl, name } = useProfileRecoil(item.address);
  const { address: toAddress, imageUrl: toImageUrl, name: toName } = useProfileRecoil(item.to);
  const classes = useStyles();
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
            {t('to')}
          </Typography>
          <AvatarName address={toAddress} imageUrl={toImageUrl} name={toName} />
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
  items?: ItemType[];
};

const Mobile: FC<MobileProps> = ({ className, items }) => (
  <div className={classnames(className)}>
    {items?.map((x, i) => (
      <RedelegationsItem
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