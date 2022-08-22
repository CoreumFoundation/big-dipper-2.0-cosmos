import { useEffect } from 'react';
import { useRouter } from 'next/router';

const TransactionDetailsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/transactions/${router.query.tx}`);
  }, []);

  return null;
};

TransactionDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default TransactionDetailsPage;
