import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode } from 'react';
import useStyles from '@/components/single_transaction_mobile/styles';

type SingleTransactionMobileProps = {
  className?: string;
  block: ReactNode;
  hash: ReactNode;
  time: ReactNode;
  messages: ReactNode;
  result?: ReactNode;
  fee?: ReactNode;
  amount?: ReactNode;
  sender?: ReactNode;
  receiver?: ReactNode;
};

const SingleTransactionMobile: FC<SingleTransactionMobileProps> = ({
  className,
  block,
  hash,
  time,
  messages,
  result,
  fee,
  amount,
  sender,
  receiver,
}) => {
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('block')}
          </Typography>
          {block}
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('hash')}
          </Typography>
          <Typography variant="body1" className="value">
            {hash}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        {!!messages && (
          <div className={classes.item}>
            <Typography variant="h4" className="label">
              {t('messages')}
            </Typography>
            <Typography variant="body1" className="value">
              {messages}
            </Typography>
          </div>
        )}
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('result')}
          </Typography>
          {result}
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('amount')}
          </Typography>
          <Typography variant="body1" className="value">
            {amount}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('fee')}
          </Typography>
          <Typography variant="body1" className="value" component="div">
            {fee}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('sender')}
          </Typography>
          <Typography variant="body1" className="value">
            {sender}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('receiver')}
          </Typography>
          <Typography variant="body1" className="value" component="div">
            {receiver}
          </Typography>
        </div>
      </div>
      <div className={classes.item}>
        <Typography variant="h4" className="label">
          {t('time')}
        </Typography>
        <Typography variant="body1" className="value" component="div">
          {time}
        </Typography>
      </div>
    </div>
  );
};

export default SingleTransactionMobile;
