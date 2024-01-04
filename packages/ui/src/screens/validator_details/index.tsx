import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import DesmosProfile from '@/components/desmos_profile';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Blocks from '@/screens/validator_details/components/blocks';
import Profile from '@/screens/validator_details/components/profile';
import Staking from '@/screens/validator_details/components/staking';
import Transactions from '@/screens/validator_details/components/transactions';
import ValidatorOverview from '@/screens/validator_details/components/validator_overview';
import VotingPower from '@/screens/validator_details/components/voting_power';
import { useValidatorDetails } from '@/screens/validator_details/hooks';
import useStyles from '@/screens/validator_details/styles';
import Link from 'next/link';

const ValidatorDetails = () => {
  const { t } = useTranslation('validators');
  const { classes } = useStyles();
  const { state, loading } = useValidatorDetails();
  const { desmosProfile, exists, overview, status, votingPower } = state;

  return (
    <>
      <NextSeo
        title={t('validatorDetails') ?? undefined}
        openGraph={{
          title: t('validatorDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('validatorDetails') ?? undefined}>
        <LoadAndExist exists={exists} loading={loading}>
          <span className={classes.root}>
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
                Back to all validators
              </Link>
              <div className={classes.title}>{t('validatorDetails')}</div>
            </div>
            {desmosProfile ? (
              <DesmosProfile className={classes.profile} {...desmosProfile} />
            ) : (
              <Profile className={classes.profile} profile={overview} />
            )}
            <ValidatorOverview className={classes.address} overview={overview} status={status} />
            <VotingPower
              className={classes.votingPower}
              data={votingPower}
              status={status.status}
            />
            <Blocks className={classes.blocks} />
            <Staking className={classes.staking} />
            <Transactions className={classes.transactions} />
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ValidatorDetails;
