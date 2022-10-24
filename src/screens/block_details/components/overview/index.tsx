import React from 'react';
import numeral from 'numeral';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { useProfileRecoil } from '@recoil/profiles';
import { readDate } from '@recoil/settings';
import {
  AvatarName,
  Box,
} from '@components';
import { OverviewType } from '../../types';
import { useStyles } from './styles';

const Overview: React.FC<OverviewType & ComponentDefault> = (props) => {
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
};

export default Overview;
