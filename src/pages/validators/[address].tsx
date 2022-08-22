import ValidatorDetails from '@screens/validator_details';

const ValidatorDetailsPage = () => {
  return (
    <ValidatorDetails />
  );
};

ValidatorDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default ValidatorDetailsPage;
