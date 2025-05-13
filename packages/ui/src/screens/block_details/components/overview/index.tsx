import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import numeral from 'numeral';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import AvatarName from '@/components/avatar_name';
import Box from '@/components/box';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { readDate } from '@/recoil/settings';
import type { OverviewType } from '@/screens/block_details/types';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import useStyles from './styles';

const Overview: FC<OverviewType & ComponentDefault> = (props) => {
  const { address, imageUrl, name } = useProfileRecoil(props.proposer);
  const { t } = useTranslation('blocks');
  const dateFormat = useRecoilValue(readDate);
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2">{t('overview')}</Typography>
      <div className={classes.item}>
        <div className="label">{t('hash')}</div>
        {props.hash}
      </div>
      <div className={classes.details}>
        <div className={classes.item}>
          <div className="label">{t('height')}</div>
          <div>{props.height}</div>
        </div>
        <div className={classes.item}>
          <div className="label">{t('time')}</div>
          <div>{formatDayJs(dayjs.utc(props.timestamp), dateFormat)}</div>
        </div>
        <div className={classes.item}>
          <div className="label">{t('proposer')}</div>
          <AvatarName
            address={address}
            imageUrl={props.avatarUrl ?? imageUrl}
            name={props.moniker?.length ? props.moniker : name}
          />
        </div>
        <div className={classes.item}>
          <div className="label">{t('txs')}</div>
          <div>{numeral(props.txs).format('0,0')}</div>
        </div>
      </div>
    </Box>
  );
};

export default Overview;
