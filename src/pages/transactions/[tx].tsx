import TransactionDetails from '@src/screens/transaction_details';

const TransactionDetailsPage = () => {
  return (
    <TransactionDetails />
  );
};

TransactionDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default TransactionDetailsPage;
