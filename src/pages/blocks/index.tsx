import Blocks from '@src/screens/blocks';

const BlocksPage = () => {
  return (
    <Blocks />
  );
};

BlocksPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default BlocksPage;
