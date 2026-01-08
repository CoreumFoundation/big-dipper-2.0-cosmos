import AppBar from '@mui/material/AppBar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Drawer from '@mui/material/Drawer';
import { FC, useMemo } from 'react';
import MenuItems from '@/components/nav/components/menu_items';
import useStyles from '@/components/nav/components/desktop/styles';
import { useDesktop } from '@/components/nav/components/desktop/hooks';
import ActionBar from '@/components/nav/components/desktop/components/action_bar';
import { useBanner } from '@/components/layout/contexts/banner';
import Logo from '@/assets/logo.svg';
import LogoText from '@/assets/logo-text-white.svg';
import DevnetBadge from '@/assets/devnet-badge.svg';
import TestnetBadge from '@/assets/testnet-badge.svg';
import MainnetBadge from '@/assets/mainnet-badge.svg';
import ArrowIcon from '@/assets/icon_nav.svg';

type DesktopProps = {
  className?: string;
};

const Desktop: FC<DesktopProps> = ({ className }) => {
  const { isBannerVisible, bannerHeight } = useBanner();
  const { classes, cx } = useStyles({ isBannerOpen: isBannerVisible, bannerHeight });
  const netName = process.env.NEXT_PUBLIC_CHAIN_TYPE;
  const { isMenu, toggleMenu, turnOffAll } = useDesktop();

  const renderBadge = useMemo(() => {
    switch (netName) {
      case 'devnet':
        return <DevnetBadge style={{ opacity: isMenu ? 1 : 0, transition: '.3s ease' }} />;
      case 'testnet':
        return <TestnetBadge style={{ opacity: isMenu ? 1 : 0, transition: '.3s ease' }} />;
      default:
        return <MainnetBadge style={{ opacity: isMenu ? 1 : 0, transition: '.3s ease' }} />;
    }
  }, [isMenu, netName]);

  return (
    <ClickAwayListener onClickAway={turnOffAll}>
      <div className={cx(classes.root, className)}>
        <AppBar
          position="fixed"
          className={cx(classes.appBar, {
            open: isMenu,
          })}
        >
          <ActionBar />
        </AppBar>
        <ArrowIcon
          className={cx(classes.arrowIcon, isMenu ? 'collapse' : '')}
          onClick={toggleMenu}
        />
        <Drawer
          variant="permanent"
          className={cx(classes.drawer, {
            open: isMenu,
            closed: !isMenu,
            [classes.drawerOpen]: isMenu,
            [classes.drawerClose]: !isMenu,
          })}
          classes={{
            paper: cx({
              open: isMenu,
              closed: !isMenu,
              [classes.drawerOpen]: isMenu,
              [classes.drawerClose]: !isMenu,
            }),
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div className={classes.logo} role="button" onClick={toggleMenu}>
            {/* FIXME get light and dark theme assets */}
            <Logo />
            <div className={classes.logo_text}>
              <LogoText
                style={{
                  opacity: isMenu ? 1 : 0,
                  transition: '.3s ease',
                }}
              />
              {renderBadge}
            </div>
          </div>
          <MenuItems />
        </Drawer>
      </div>
    </ClickAwayListener>
  );
};

export default Desktop;
