import Box from '@/components/box';
import { useStyles } from '@/screens/account_details/components/overview/styles';
import type { OverviewType } from '@/screens/account_details/types';
import { formatNumber } from '@/utils/format_token';
import { getShardDisplay } from '@/utils/get_shard_display';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import numeral from 'numeral';
import React, { FC, isValidElement } from 'react';

const Overview: FC<{ className?: string; overview: OverviewType }> = (props) => {
  const { t } = useTranslation('accounts');
  const classes = useStyles();
  const shard = getShardDisplay(props.overview.shard);

  const items = [
    {
      key: 'balance',
      name: t('balance'),
      value: `${formatNumber(
        props.overview.balance.value,
        props.overview.balance.exponent
      )} ${props.overview.balance.displayDenom.toUpperCase()}`,
    },
    {
      key: 'developerReward',
      name: t('developerReward'),
      value: `${formatNumber(
        props.overview.developerReward.value,
        props.overview.developerReward.exponent
      )} ${props.overview.developerReward.displayDenom.toUpperCase()}`,
    },
    {
      key: 'shard',
      name: t('shard'),
      value: shard.key === 'metachain' ? t('common:metachain') : props.overview.shard,
    },
    {
      key: 'tokens',
      name: t('tokens'),
      value: numeral(props.overview.tokenCount).format('0,0'),
    },
  ];

  return (
    <Box className={classnames(props.className)}>
      <Typography className={classes.title} variant="h2">
        {t('overview')}
      </Typography>
      <div className={classes.body}>
        {items?.map((x) => (
          <div key={x.key} className={classes.item}>
            <div className={classes.hash}>
              <div className={classes.bullet} />
              <div>
                <Typography variant="body1" className="item__key">
                  {x.name}
                </Typography>
                {isValidElement(x.value) ? (
                  <div>{x.value}</div>
                ) : (
                  <Typography variant="body1">{x.value}</Typography>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Overview;