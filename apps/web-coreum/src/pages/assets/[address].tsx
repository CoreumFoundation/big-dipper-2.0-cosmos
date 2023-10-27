import withGetStaticProps from '@/pages/withGetStaticProps';
import type { NextPage } from 'next';
import AssetDetails from '@/screens/asset_details';
import nextI18NextConfig from '../../../next-i18next.config';

const AssetDetailsPage: NextPage = () => <AssetDetails />;

export const getStaticPaths = () => ({ paths: [], fallback: 'blocking' });
export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'assets',
  'message_labels',
  'message_contents'
);

export default AssetDetailsPage;
