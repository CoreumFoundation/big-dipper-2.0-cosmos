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
import Link from 'next/link';

const AccountDetails = () => {
  const { t } = useTranslation('accounts');
  const { classes } = useStyles();
  const { state } = useAccountDetails();

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
              <div className={classes.title}>{t('accountDetails')}</div>
            </div>
            <Overview
              className={classes.overview}
              withdrawalAddress={state.overview.withdrawalAddress}
              address={state.overview.address}
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
};

export default AccountDetails;
