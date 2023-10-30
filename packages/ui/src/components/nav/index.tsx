import Desktop from '@/components/nav/components/desktop';
import Mobile from '@/components/nav/components/mobile';
import { useDisplayStyles } from '@/styles/useSharedStyles';

const Nav = () => {
  const display = useDisplayStyles().classes;

  return (
    <>
      <Desktop className={display.hiddenUntilLg} />
      <Mobile className={display.hiddenWhenLg} />
    </>
  );
};

export default Nav;
