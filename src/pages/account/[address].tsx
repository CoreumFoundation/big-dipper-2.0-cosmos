import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AccountDetailsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/accounts/${router.query.address}`);
  }, []);

  return null;
};

AccountDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default AccountDetailsPage;
