import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import BoxDetails from '@/screens/params/components/box_details';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import { useParams } from '@/screens/params/hooks';
import useStyles from '@/screens/params/styles';
import boxDetailsStyles from '@/screens/params/components/box_details/styles';
import { Typography } from '@mui/material';
import {
  formatDistribution,
  formatGov,
  formatMinting,
  formatSlashing,
  formatStaking,
  formatFeeModel,
  formatFT,
  formatNFT,
  formatAuth,
  formatDex,
  formatPse,
} from '@/screens/params/utils';

const Params = () => {
  const { t } = useTranslation('params');
  const { classes } = useStyles();
  const { classes: boxDetailsClasses } = boxDetailsStyles();
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

  const feeModel = state.feeModel
    ? {
        title: t('feeModel') ?? undefined,
        details: formatFeeModel(state.feeModel, t),
      }
    : null;

  const auth = state.auth
    ? {
        title: t('auth') ?? undefined,
        details: formatAuth(state.auth, t),
      }
    : null;

  const dex = state.dex
    ? {
        title: t('dex') ?? undefined,
        details: formatDex(state.dex, t),
      }
    : null;

  const ft = state.ft ? { title: t('ft') ?? undefined, details: formatFT(state.ft, t) } : null;
  const nft = state.nft ? { title: t('nft') ?? undefined, details: formatNFT(state.nft, t) } : null;

  const pse = state.pse
    ? {
        title: t('pse') ?? undefined,
        details: formatPse(state.pse, t),
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
          <Typography variant="h1" className={classes.header}>
            {t('params')}
          </Typography>
          <span className={classes.root}>
            {staking && <BoxDetails {...staking} />}
            {slashing && <BoxDetails {...slashing} />}
            {minting && <BoxDetails {...minting} />}
            {distribution && <BoxDetails {...distribution} />}
            {gov && <BoxDetails {...gov} />}
            {feeModel && <BoxDetails {...feeModel} />}
            {ft && <BoxDetails {...ft} />}
            {nft && <BoxDetails {...nft} />}
            {auth && <BoxDetails {...auth} />}
            {dex && <BoxDetails {...dex} />}
            {pse && <BoxDetails {...pse} bodyClassName={boxDetailsClasses.bodyPse} />}
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Params;
