import Validators from '@screens/validators';

const ValidatorsPage = () => {
  return (
    <Validators />
  );
};

ValidatorsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default ValidatorsPage;
