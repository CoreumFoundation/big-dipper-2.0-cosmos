import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import BoxDetails from '@/components/box_details';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import { useParams } from '@/screens/params/hooks';
import useStyles from '@/screens/params/styles';
import {
  formatDistribution,
  formatGasPrice,
  formatGov,
  formatInflationRate,
  formatMinting,
  formatSlashing,
  formatStaking,
} from '@/screens/params/utils';

const Params = () => {
  const { t } = useTranslation('params');
  const { classes } = useStyles();
  const { state } = useParams();

  const staking = state.staking
    ? {
        title: t('staking') ?? undefined,
        details: formatStaking(state.staking, t),
      }
    : null;

  const slashing = state.slashing
    ? {
        title: t('slashing') ?? undefined,
        details: formatSlashing(state.slashing, t),
      }
    : null;

  const minting = state.minting
    ? {
        title: t('minting') ?? undefined,
        details: formatMinting(state.minting, t),
      }
    : null;

  const distribution = state.distribution
    ? {
        title: t('distribution') ?? undefined,
        details: formatDistribution(state.distribution, t),
      }
    : null;

  const gov = state.gov
    ? {
        title: t('gov') ?? undefined,
        details: formatGov(state.gov, t),
      }
    : null;

  const inflationRate = state.inflationRate
    ? {
        title: t('inflationRate') ?? undefined,
        details: formatInflationRate(state.inflationRate),
      }
    : null;

  const gasPrice = state.gasPrice
    ? {
        title: t('gasPrice') ?? undefined,
        details: formatGasPrice(state.gasPrice),
      }
    : null;

  return (
    <>
      <NextSeo
        title={t('params') ?? undefined}
        openGraph={{
          title: t('params') ?? undefined,
        }}
      />
      <Layout navTitle={t('params') ?? undefined}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <span className={classes.root}>
            {staking && <BoxDetails {...staking} />}
            {slashing && <BoxDetails {...slashing} />}
            {minting && <BoxDetails {...minting} />}
            {distribution && <BoxDetails {...distribution} />}
            {gov && <BoxDetails {...gov} />}
            {inflationRate && <BoxDetails {...inflationRate} />}
            {gasPrice && <BoxDetails {...gasPrice} />}
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Params;
