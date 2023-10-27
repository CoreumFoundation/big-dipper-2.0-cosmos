import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import { useAssetDetails } from '@/screens/asset_details/hooks';
import useStyles from '@/screens/asset_details/styles';
import AssetOverview from '@/screens/asset_details/components/AssetOverview';
import AssetDetailsOverview from '@/screens/asset_details/components/AssetDetails';
import AssetPriceOverview from '@/screens/asset_details/components/AssetPriceOverview';

const AssetDetails = () => {
  const { t } = useTranslation('assets');
  const { classes } = useStyles();
  const { state, loading } = useAssetDetails();
  const { exists, asset } = state;

  return (
    <>
      <NextSeo
        title={t('assetDetails') ?? undefined}
        openGraph={{
          title: t('assetDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('assetDetails') ?? undefined}>
        <LoadAndExist exists={exists} loading={loading}>
          <span className={classes.root}>
            <AssetOverview className={classes.block} asset={asset} />
            <AssetDetailsOverview className={classes.block} asset={asset} />
            <AssetPriceOverview className={classes.block} asset={asset} />
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default AssetDetails;
