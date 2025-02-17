import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import DesmosProfile from '@/components/desmos_profile';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Balance from '@/screens/account_details/components/balance';
import OtherTokens from '@/screens/account_details/components/other_tokens';
import Overview from '@/screens/account_details/components/overview';
import Staking from '@/screens/account_details/components/staking';
import Transactions from '@/screens/account_details/components/transactions';
import { useAccountDetails } from '@/screens/account_details/hooks';
import useStyles from '@/screens/account_details/styles';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function AccountDetails() {
  const { t } = useTranslation('accounts');
  const { classes } = useStyles();
  const { state } = useAccountDetails();
  const router = useRouter();
  const [previousRouteDefined, setPreviousRouteDefined] = useState<boolean>(false);

  useEffect(() => {
    Object.keys((router as any).components).forEach((key) => {
      const parsedKey = key.replace('_', '');

      if (parsedKey !== router.pathname && parsedKey !== '/app') {
        setPreviousRouteDefined(true);
      }
    });
  }, []);

  const goBack = useCallback(() => {
    if (previousRouteDefined) {
      router.back();
    } else {
      router.push('/');
    }
  }, [router, previousRouteDefined]);

  return (
    <>
      <NextSeo
        title={t('accountDetails') ?? undefined}
        openGraph={{
          title: t('accountDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('accountDetails') ?? undefined}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <span className={classes.root}>
            {!!state.desmosProfile && (
              <DesmosProfile
                dtag={state.desmosProfile.dtag}
                nickname={state.desmosProfile.nickname}
                imageUrl={state.desmosProfile.imageUrl}
                bio={state.desmosProfile.bio}
                connections={state.desmosProfile.connections}
                coverUrl={state.desmosProfile.coverUrl}
              />
            )}
            <div className={classes.block}>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={goBack} className={classes.breadcrumb}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 13.5L5.5 8.5L10.5 3.5" stroke="#25D695" strokeWidth="1.5" />
                </svg>
                Back
              </div>
              <div className={classes.title}>{t('accountDetails')}</div>
            </div>
            <Overview
              className={classes.overview}
              withdrawalAddress={state.overview.withdrawalAddress}
              address={state.overview.address}
              domain={state.domain}
              riskScoreData={state.riskScoreData}
            />
            <Balance
              className={classes.balance}
              available={state.balance.available}
              delegate={state.balance.delegate}
              unbonding={state.balance.unbonding}
              reward={state.balance.reward}
              commission={state.balance.commission}
              total={state.balance.total}
            />
            <OtherTokens className={classes.otherTokens} otherTokens={state.otherTokens} />
            <Staking className={classes.staking} rewards={state.rewards} />
            <Transactions className={classes.transactions} loading={state.balanceLoading} />
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
}
