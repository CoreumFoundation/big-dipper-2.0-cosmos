import BlockDetails from '@src/screens/block_details';

const BlockDetailsPage = () => {
  return (
    <BlockDetails />
  );
};

BlockDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default BlockDetailsPage;
