import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode } from 'react';
import useStyles from '@/components/transactions_list_details/components/list/components/single_transaction/styles';

export type SingleBridgeTransactionProps = {
  className?: string;
  route: ReactNode;
  amount: ReactNode;
  txHash_1: ReactNode;
  txHash_2: ReactNode;
  destination: ReactNode;
  time: ReactNode;
};

const SingleBridgeTransaction: FC<SingleBridgeTransactionProps> = ({
  className,
  route,
  txHash_1,
  time,
  txHash_2,
  destination,
  amount,
}) => {
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.itemContainer}>
        <div className={classes.itemPrimaryDetailsContainer}>
          <div className={cx(classes.item, 'block')}>
            <Typography variant="h4" className="label">
              {t('route')}
            </Typography>
            {route}
          </div>
          <div className={cx(classes.item, 'block')}>
            <Typography variant="h4" className="label">
              {t('amount')}
            </Typography>
            {amount}
          </div>
          <div className={cx(classes.item, 'block')}>
            <Typography variant="h4" className="label">
              {t('destination')}
            </Typography>
            {destination}
          </div>
          <div className={cx(classes.item, 'time')}>
            <Typography variant="h4" className="label">
              {t('time')}
            </Typography>
            {time}
          </div>
        </div>
        <div className={classes.itemPrimaryDetailsContainer}>
          <div className={cx(classes.item, 'block')}>
            <Typography variant="h4" className="label">
              {t('txHash_1')}
            </Typography>
            {txHash_1}
          </div>
          <div className={cx(classes.item, 'block')}>
            <Typography variant="h4" className="label">
              {t('txHash_2')}
            </Typography>
            {txHash_2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBridgeTransaction;
