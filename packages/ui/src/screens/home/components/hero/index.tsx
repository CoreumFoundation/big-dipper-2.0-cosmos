import Box from '@/components/box';
import Loading from '@/components/loading';
import OnlineVotingPower from '@/screens/home/components/hero/components/online_voting_power';
import { useHero } from '@/screens/home/components/hero/hooks';
import { FC } from 'react';

const Hero: FC<ComponentDefault> = (props) => {
  const { state } = useHero();
  let component = null;
  if (!state.loading) {
    component = <OnlineVotingPower />;
  } else {
    component = <Loading />;
  }

  return <Box className={props.className}>{component}</Box>;
};

export default Hero;
