import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import {
  Layout,
  TransactionsList,
  Box,
  LoadAndExist,
  TransactionListDetails,
} from '@components';
import { useRecoilValue } from 'recoil';
import { readTx } from '@recoil/settings';
import {
  Switch, Typography,
} from '@material-ui/core';
import { useSettingList } from '@src/components/nav/components/desktop/components/action_bar/components/setting_list/hooks';
import { useStyles } from './styles';
import { useTransactions } from './hooks';

const Transactions = () => {
  const txListFormat = useRecoilValue(readTx);
  const {
    t, lang,
  } = useTranslation('transactions');
  const classes = useStyles();
  const {
    state, loadNextPage,
  } = useTransactions();
  const {
    updateTxFormat,
  } = useSettingList({ lang });
  const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
  const isItemLoaded = (index) => !state.hasNextPage || index < state.items.length;
  const itemCount = state.hasNextPage
    ? state.items.length + 1
    : state.items.length;
  return (
    <>
      <NextSeo
        title={t('transactions')}
        openGraph={{
          title: t('transactions'),
        }}
      />
      <Layout navTitle={t('transactions')} className={classes.root}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <div className={classes.header}>
            <Typography variant="h1">{t('transactions')}</Typography>
            <div className={classes.header}>
              <Typography variant="h4">{t('showDetails')}</Typography>
              <Switch
                color="primary"
                checked={txListFormat === 'detailed'}
                onChange={updateTxFormat}
              />
            </div>
          </div>
          <Box className={classes.box}>
            {txListFormat === 'compact' ? (
              <TransactionsList
                transactions={state.items}
                itemCount={itemCount}
                hasNextPage={state.hasNextPage}
                isNextPageLoading={state.isNextPageLoading}
                loadNextPage={loadNextPage}
                loadMoreItems={loadMoreItems}
                isItemLoaded={isItemLoaded}
              />
            ) : (
              <TransactionListDetails
                transactions={state.items}
                itemCount={itemCount}
                hasNextPage={state.hasNextPage}
                isNextPageLoading={state.isNextPageLoading}
                loadNextPage={loadNextPage}
                loadMoreItems={loadMoreItems}
                isItemLoaded={isItemLoaded}
              />
            )}
          </Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Transactions;
