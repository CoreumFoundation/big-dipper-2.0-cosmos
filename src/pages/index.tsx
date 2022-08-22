import Home from '@screens/home';

const HomePage = () => {
  return (
    <Home />
  );
};

HomePage.getServerSideProps = async () => {
  return { foo: 'bar' };
};

export default HomePage;
