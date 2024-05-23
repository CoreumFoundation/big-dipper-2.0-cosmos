import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { useRecoilValue } from 'recoil';
import { Switch, Typography } from '@mui/material';
import Box from '@/components/box';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import TransactionsList from '@/components/transactions_list';
import TransactionsListDetails from '@/components/transactions_list_details';
import { readTx } from '@/recoil/settings';
import { useSettingList } from '@/components/nav/components/desktop/components/action_bar/components/settings_list/hooks';
import { useTransactions } from '@/screens/transactions/hooks';
import useStyles from '@/screens/transactions/styles';
import { useCallback, useMemo } from 'react';
import Tabs from '@/screens/transactions/components/tabs';
import TransactionsListBridge from '@/components/transactions_list_bridge';
import TransactionsListBridgeDetails from '@/components/transactions_list_bridge_details';

const Transactions = () => {
  const txListFormat = useRecoilValue(readTx);
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();
  const { state, loadNextPage, loadBridgeNextPage, handleTabChange } = useTransactions();
  const { updateTxFormat } = useSettingList();
  const loadMoreItems = useMemo(
    () => (state.isNextPageLoading ? () => null : loadNextPage),
    [state.isNextPageLoading, loadNextPage]
  );
  const isItemLoaded = useCallback(
    (index: number) => !state.hasNextPage || index < state.items.length,
    [state.hasNextPage, state.items.length]
  );
  const itemCount = useMemo(
    () => (state.hasNextPage ? state.items.length + 1 : state.items.length),
    [state.hasNextPage, state.items.length]
  );

  const loadMoreBridgeItems = useMemo(
    () => (state.isBridgeNextPageLoading ? () => null : loadBridgeNextPage),
    [state.isBridgeNextPageLoading, loadBridgeNextPage]
  );
  const isBridgeItemLoaded = useCallback(
    (index: number) => !state.bridgeHasNextPage || index < state.bridgeItems.length,
    [state.bridgeItems.length, state.bridgeHasNextPage]
  );
  const bridgeItemCount = useMemo(
    () => (state.bridgeHasNextPage ? state.bridgeItems.length + 1 : state.bridgeItems.length),
    [state.bridgeHasNextPage, state.bridgeItems.length]
  );

  const renderTable = useMemo(() => {
    if (state.tab === 0) {
      return txListFormat === 'compact' ? (
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
        <TransactionsListDetails
          transactions={state.items}
          itemCount={itemCount}
          hasNextPage={state.hasNextPage}
          isNextPageLoading={state.isNextPageLoading}
          loadNextPage={loadNextPage}
          loadMoreItems={loadMoreItems}
          isItemLoaded={isItemLoaded}
        />
      );
    }

    return txListFormat === 'compact' ? (
      <TransactionsListBridge
        transactions={state.bridgeItems}
        itemCount={bridgeItemCount}
        hasNextPage={state.bridgeHasNextPage}
        isNextPageLoading={state.isBridgeNextPageLoading}
        loadNextPage={loadBridgeNextPage}
        loadMoreItems={loadMoreBridgeItems}
        isItemLoaded={isBridgeItemLoaded}
        assets={state.assets}
        metadatas={state.metadatas}
      />
    ) : (
      <TransactionsListBridgeDetails
        transactions={state.bridgeItems}
        itemCount={bridgeItemCount}
        hasNextPage={state.bridgeHasNextPage}
        isNextPageLoading={state.isBridgeNextPageLoading}
        loadNextPage={loadBridgeNextPage}
        loadMoreItems={loadMoreBridgeItems}
        isItemLoaded={isBridgeItemLoaded}
        assets={state.assets}
        metadatas={state.metadatas}
      />
    );
  }, [
    bridgeItemCount,
    isBridgeItemLoaded,
    isItemLoaded,
    itemCount,
    loadBridgeNextPage,
    loadMoreBridgeItems,
    loadMoreItems,
    loadNextPage,
    state,
    txListFormat,
  ]);

  return (
    <>
      <NextSeo
        title={t('transactions') ?? undefined}
        openGraph={{
          title: t('transactions') ?? undefined,
        }}
      />
      <Layout
        navTitle={t('transactions') ?? undefined}
        className={classes.root}
        rootClassName={classes.layoutRoot}
        contentWrapperClassName={classes.layoutContentWrapper}
      >
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
          <Tabs tab={state.tab} handleTabChange={handleTabChange} />
          <Box className={cx(classes.box, 'scrollbar')}>{renderTable}</Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Transactions;
