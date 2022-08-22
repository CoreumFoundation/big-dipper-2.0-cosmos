import ProposalDetails from '@src/screens/proposal_details';

const TokenDetailsPage = () => {
  return (
    <ProposalDetails />
  );
};

TokenDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default TokenDetailsPage;
