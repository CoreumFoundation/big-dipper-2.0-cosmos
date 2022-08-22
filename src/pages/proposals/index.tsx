import Tokens from '@src/screens/proposals';

const TokensPage = () => {
  return (
    <Tokens />
  );
};

TokensPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default TokensPage;
