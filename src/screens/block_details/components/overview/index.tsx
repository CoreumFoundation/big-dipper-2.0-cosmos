import React from 'react';
import numeral from 'numeral';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { useProfileRecoil } from '@recoil/profiles';
import { readDate } from '@recoil/settings';
import {
  BoxDetails, AvatarName, Box,
} from '@components';
import { OverviewType } from '../../types';
import { useStyles } from './styles';

const Overview: React.FC<OverviewType & ComponentDefault> = (props, { className }) => {
  const proposer = useProfileRecoil(props.proposer);
  const { t } = useTranslation('blocks');
  const dateFormat = useRecoilValue(readDate);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2">
        {t('overview')}
      </Typography>
      <div className={classes.item}>
        <div className="label">
          {t('hash')}
        </div>
        {props.hash}
      </div>
      <div className={classes.details}>
        <div className={classes.item}>
          <div className="label">
            {t('height')}
          </div>
          <div>
            {props.height}
          </div>
        </div>
        <div className={classes.item}>
          <div className="label">
            {t('time')}
          </div>
          <div>
            {formatDayJs(dayjs.utc(props.timestamp), dateFormat)}
          </div>
        </div>
        <div className={classes.item}>
          <div className="label">
            {t('proposer')}
          </div>
          <AvatarName
            address={props.proposer}
            imageUrl={proposer.imageUrl}
            name={proposer.name}
          />
        </div>
        <div className={classes.item}>
          <div className="label">
            {t('txs')}
          </div>
          <div>
            {numeral(props.txs).format('0,0')}
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <BoxDetails
      className={className}
      title={t('overview')}
      details={[
        {
          label: t('height'),
          detail: (
            <Typography variant="body1" className="value">
              {numeral(props.height).format('0,0')}
            </Typography>
          ),
        },
        {
          label: t('hash'),
          detail: props.hash,
        },
        {
          label: t('proposer'),
          detail: (
            <AvatarName
              address={props.proposer}
              imageUrl={proposer.imageUrl}
              name={proposer.name}
            />
          ),
        },
        {
          label: t('time'),
          detail: formatDayJs(dayjs.utc(props.timestamp), dateFormat),
        },
        {
          label: t('txs'),
          detail: numeral(props.txs).format('0,0'),
        },
      ]}
    />
  );
};

export default Overview;
