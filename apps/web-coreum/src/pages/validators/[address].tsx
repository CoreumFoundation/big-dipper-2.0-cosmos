import withGetStaticProps from '@/pages/withGetStaticProps';
import ValidatorDetails from '@/screens/validator_details';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const ValidatorDetailsPage: NextPage = () => <ValidatorDetails />;

export const getStaticPaths = () => ({ paths: [], fallback: 'blocking' });
export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'accounts',
  'common',
  'message_labels',
  'message_contents',
  'transactions',
  'validators'
);

export default ValidatorDetailsPage;
