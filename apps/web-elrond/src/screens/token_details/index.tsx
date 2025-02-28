import React from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Profile from '@/screens/token_details/components/profile';
import Overview from '@/screens/token_details/components/overview';
import Stats from '@/screens/token_details/components/stats';
import Transactions from '@/screens/token_details/components/transactions';
import useStyles from '@/screens/token_details/styles';
import { useTokenDetails } from '@/screens/token_details/hooks';

const TokenDetails = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('tokens');
  const { state } = useTokenDetails();

  return (
    <>
      <NextSeo
        title={t('tokenDetails') ?? undefined}
        openGraph={{
          title: t('tokenDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('tokenDetails') ?? undefined} className={classes.root}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <Profile className={classes.profile} profile={state.profile} />
          <Stats className={classes.stats} stats={state.stats} />
          <Overview className={classes.overview} overview={state.overview} />
          <Transactions className={classes.transaction} />
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default TokenDetails;
