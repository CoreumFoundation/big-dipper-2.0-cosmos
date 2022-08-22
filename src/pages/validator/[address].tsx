import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ValidatorDetailsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/validators/${router.query.address}`);
  }, []);

  return null;
};

ValidatorDetailsPage.getServerSideProps = async () => {
  // Dummy function to force SSR
  return { foo: 'bar' };
};

export default ValidatorDetailsPage;
