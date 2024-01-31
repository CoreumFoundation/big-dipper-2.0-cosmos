import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Logs from '@/screens/transaction_details/components/logs';
import Messages from '@/screens/transaction_details/components/messages';
import Overview from '@/screens/transaction_details/components/overview';
import { useTransactionDetails } from '@/screens/transaction_details/hooks';
import useStyles from '@/screens/transaction_details/styles';
import Link from 'next/link';

const TransactionDetails = () => {
  const { t } = useTranslation('transactions');
  const { classes } = useStyles();
  const { state, onMessageFilterCallback, toggleMessageDisplay, filterMessages } =
    useTransactionDetails();
  const { overview, logs, messages, assets, metadatas } = state;

  return (
    <>
      <NextSeo
        title={t('transactionDetails') ?? undefined}
        openGraph={{
          title: t('transactionDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('transactionDetails') ?? undefined}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <div className={classes.block}>
            <Link href="/transactions" className={classes.breadcrumb}>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.5 13.5L5.5 8.5L10.5 3.5" stroke="#25D695" strokeWidth="1.5" />
              </svg>
              Back to all transactions
            </Link>
            <div className={classes.title}>{t('transactionDetails')}</div>
          </div>
          <span className={classes.root}>
            <div className={classes.top}>
              <Overview data={overview} />
              <Messages
                className={classes.messages}
                messages={filterMessages(messages.items)}
                viewRaw={messages.viewRaw}
                toggleMessageDisplay={toggleMessageDisplay}
                onMessageFilterCallback={onMessageFilterCallback}
                assets={assets}
                metadatas={metadatas}
              />
            </div>
            {!!logs && <Logs logs={logs} />}
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default TransactionDetails;
