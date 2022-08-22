import AccountDetails from '@src/screens/account_details';

const AccountDetailsPage = () => {
  return (
    <AccountDetails />
  );
};

AccountDetailsPage.getServerSideProps = async () => {
  return { foo: 'bar' };
};

export default AccountDetailsPage;
