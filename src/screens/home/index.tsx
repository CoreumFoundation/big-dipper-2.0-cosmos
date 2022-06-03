import React from 'react';
import { Layout } from '@components';
import { useStyles } from './styles';
import {
  DataBlocks,
  Consensus,
  Tokenomics,
  Blocks,
  Transactions,
  Hero,
} from './components';
import MainInfo from './components/main_info';

const Home = () => {
  const classes = useStyles();

  return (
    <Layout className={classes.root}>
      <MainInfo className={classes.mainInfo} />
      <DataBlocks className={classes.dataBlocks} />
      <Hero className={classes.hero} />
      <Tokenomics className={classes.tokenomics} />
      <Consensus className={classes.consensus} />
      <div className={classes.bottom}>
        <Blocks className="blocks" />
        <Transactions className="transactions" />
      </div>
    </Layout>
  );
};

export default Home;
