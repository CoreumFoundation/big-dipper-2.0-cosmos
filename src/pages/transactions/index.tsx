import Transactions from '@src/screens/transactions';

const TransactionsPage = () => {
  return (
    <Transactions />
  );
};

TransactionsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default TransactionsPage;
