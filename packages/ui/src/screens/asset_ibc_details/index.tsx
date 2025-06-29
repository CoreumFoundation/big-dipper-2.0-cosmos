import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import { useAssetDetails } from '@/screens/asset_ibc_details/hooks';
import useStyles from '@/screens/asset_details/styles';
import AssetOverview from '@/screens/asset_ibc_details/components/AssetOverview';
import AssetDetailsOverview from '@/screens/asset_ibc_details/components/AssetDetails';
import AssetPriceOverview from '@/screens/asset_ibc_details/components/AssetPriceOverview';
import Link from 'next/link';
import { useParams } from '@/screens/params/hooks';
import AssetDexSettings from './components/AssetDexSettings';

const AssetIBCDetails = () => {
  const { t } = useTranslation('assets');
  const { classes } = useStyles();
  const { state } = useAssetDetails();
  const { exists, asset, loading, assetsLoading } = state;
  const {
    state: { dex },
  } = useParams();

  return (
    <>
      <NextSeo
        title={t('assetDetails') ?? undefined}
        openGraph={{
          title: t('assetDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('assetDetails') ?? undefined}>
        <LoadAndExist exists={exists} loading={loading || assetsLoading}>
          <div className={classes.root}>
            <div className={classes.block}>
              <Link href="/assets" className={classes.breadcrumb}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 13.5L5.5 8.5L10.5 3.5" stroke="#25D695" strokeWidth="1.5" />
                </svg>
                Back to all Assets
              </Link>
              <div className={classes.title}>{t('assetDetails')}</div>
            </div>
            {asset && (
              <>
                <AssetOverview className={classes.block} asset={asset} />
                <AssetDetailsOverview className={classes.block} asset={asset} />
                <AssetPriceOverview className={classes.block} asset={asset} />
                {dex && <AssetDexSettings className={classes.block} asset={asset} dex={dex} />}
              </>
            )}
          </div>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default AssetIBCDetails;
