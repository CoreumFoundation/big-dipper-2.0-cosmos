import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode } from 'react';
import useStyles from './styles';

type SingleBridgeTransactionMobileProps = {
  className?: string;
  route: ReactNode;
  amount: ReactNode;
  txHash_1: ReactNode;
  txHash_2: ReactNode;
  destination: ReactNode;
  time: ReactNode;
  sender: ReactNode;
};

const SingleBridgeTransactionMobile: FC<SingleBridgeTransactionMobileProps> = ({
  className,
  route,
  txHash_1,
  time,
  txHash_2,
  destination,
  amount,
  sender,
}) => {
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('route')}
          </Typography>
          {route}
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('amount')}
          </Typography>
          <Typography variant="body1" className="value">
            {amount}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('sender')}
          </Typography>
          <Typography variant="body1" className="value" component="div">
            {sender}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('destination')}
          </Typography>
          <Typography variant="body1" className="value">
            {destination}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('txHash_1')}
          </Typography>
          <Typography variant="body1" className="value">
            {txHash_1}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('txHash_2')}
          </Typography>
          <Typography variant="body1" className="value" component="div">
            {txHash_2}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('time')}
          </Typography>
          <Typography variant="body1" className="value" component="div">
            {time}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleBridgeTransactionMobile;
