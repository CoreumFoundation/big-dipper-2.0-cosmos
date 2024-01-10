import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Overview from '@/screens/block_details/components/overview';
import Signatures from '@/screens/block_details/components/signatures';
import Transactions from '@/screens/block_details/components/transactions';
import { useBlockDetails } from '@/screens/block_details/hooks';
import useStyles from '@/screens/block_details/styles';
import Link from 'next/link';

const BlockDetails = () => {
  const { t } = useTranslation('blocks');
  const { classes } = useStyles();
  const { state } = useBlockDetails();
  const { overview, signatures, transactions } = state;

  return (
    <>
      <NextSeo
        title={t('blockDetails') ?? undefined}
        openGraph={{
          title: t('blockDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('blockDetails') ?? undefined}>
        <div className={classes.block}>
          <Link href="/validators" className={classes.breadcrumb}>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.5 13.5L5.5 8.5L10.5 3.5" stroke="#25D695" strokeWidth="1.5" />
            </svg>
            Back to all blocks
          </Link>
          <div className={classes.title}>{t('blockDetails')}</div>
        </div>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <span className={classes.root}>
            <Overview
              height={overview.height}
              hash={overview.hash}
              proposer={overview.proposer}
              timestamp={overview.timestamp}
              txs={overview.txs}
            />
            <Signatures className={classes.signatures} signatures={signatures} />
            <Transactions transactions={transactions} />
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default BlockDetails;
