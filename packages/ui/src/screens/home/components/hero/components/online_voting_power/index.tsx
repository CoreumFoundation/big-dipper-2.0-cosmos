import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import numeral from 'numeral';
import { FC } from 'react';
import useStyles from '@/screens/home/components/hero/components/online_voting_power/styles';
import { useOnlineVotingPower } from '@/screens/home/components/hero/components/online_voting_power/hooks';

const OnlineVotingPower: FC<ComponentDefault> = () => {
  const { t } = useTranslation('home');
  const { state } = useOnlineVotingPower();

  const votingPowerPercent =
    state.totalVotingPower === 0
      ? numeral(0)
      : numeral((state.votingPower / state.totalVotingPower) * 100);

  const { classes } = useStyles({ percentage: votingPowerPercent.format('0') });

  return (
    <div className={classes.root}>
      <Typography variant="h2">{t('onlineVotingPower')}</Typography>
      <div className={classes.chartContainer}>
        <div className={classes.chart}>
          <div className={classes.active} />
        </div>
        <div className={classes.data}>
          <Typography variant="h3" className="primary__data">
            {/* eslint-disable-next-line no-bitwise */}
            {`${votingPowerPercent.format('0,0.00', (n) => ~~n)}%`}
          </Typography>
          <Typography variant="body1" className="secondary__data">
            {numeral(state.votingPower).format('0,0')} /{' '}
            {numeral(state.totalVotingPower).format('0,0')}
          </Typography>
        </div>
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('validators')}
          </Typography>
          <Typography variant="body1" className="value">
            {numeral(state.activeValidators).format('0,0')}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('votingPowerPercent')}
          </Typography>
          <Typography variant="body1" className="value">
            {`${votingPowerPercent.format('0,0.00', (n) => Math.floor(n))}%`}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('votingPower')}
          </Typography>
          <Typography variant="body1" className="value">
            {numeral(state.votingPower).format('0,0')}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('totalVotingPower')}
          </Typography>
          <Typography variant="body1" className="value">
            {numeral(state.totalVotingPower).format('0,0')}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OnlineVotingPower;
