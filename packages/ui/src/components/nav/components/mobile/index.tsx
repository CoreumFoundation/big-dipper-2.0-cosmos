import { FC } from 'react';
import Menu from '@/components/nav/components/mobile/components/menu';
import Navbar from '@/components/nav/components/mobile/components/navbar';
import { useMobile } from '@/components/nav/components/mobile/hooks';
import useStyles from '@/components/nav/components/mobile/styles';
import { useBanner } from '@/components/layout/contexts/banner';
import { useGetComponentDimension } from '@/hooks/use_get_component_dimension';

type MobileProps = {
  className?: string;
};

const Mobile: FC<MobileProps> = ({ className }) => {
  const { ref: heightRef, height } = useGetComponentDimension();
  const { isMenu, isOpen, openNetwork, toggleNavMenus } = useMobile();
  const { isBannerVisible, bannerHeight } = useBanner();
  const { classes, cx } = useStyles({ isBannerOpen: isBannerVisible, bannerHeight });

  return (
    <div className={className}>
      <div ref={heightRef} className={classes.root}>
        <Menu
          toggleNavMenus={toggleNavMenus}
          className={cx(classes.screens, {
            open: isMenu,
            menu: isMenu,
          })}
        />
        <Navbar isOpen={isOpen} openNetwork={openNetwork} toggleNavMenus={toggleNavMenus} />
      </div>
      {/* ============================== */}
      {/* Height placeholder */}
      {/* ============================== */}
      <div style={{ height }} />
    </div>
  );
};

export default Mobile;
