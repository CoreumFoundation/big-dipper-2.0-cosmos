import withGetStaticProps from '@/pages/withGetStaticProps';
import Assets from '@/screens/assets';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const AssetsPage: NextPage = () => <Assets />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'assets',
  'message_labels',
  'message_contents'
);

export default AssetsPage;
