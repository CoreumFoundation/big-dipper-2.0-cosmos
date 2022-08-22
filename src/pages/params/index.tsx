import Params from '@src/screens/params';

const ParamsPage = () => {
  return (
    <Params />
  );
};

ParamsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default ParamsPage;
