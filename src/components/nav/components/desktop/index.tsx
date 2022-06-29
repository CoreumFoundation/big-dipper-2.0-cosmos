import React from 'react';
import classnames from 'classnames';
import {
  Drawer,
  AppBar,
  ClickAwayListener,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { readTheme } from '@recoil/settings/selectors';
import Logo from '@assets/logo.svg';
import LogoTextDark from '@assets/logo-text-dark.svg';
import DevnetBadge from '@assets/devnet-badge.svg';
import { useStyles } from './styles';
import { useDesktop } from './hooks';
import {
  MenuItems,
  // TitleBar,
} from '..';
import { ActionBar } from './components';

const Desktop: React.FC<{
  className?: string;
}> = ({
  className,
}) => {
  const classes = useStyles();
  const theme = useRecoilValue(readTheme);
  const {
    isMenu,
    toggleMenu,
    turnOffAll,
    toggleNetwork,
    isNetwork,
  } = useDesktop();
  return (
    <ClickAwayListener onClickAway={turnOffAll}>
      <div
        className={classnames(className, classes.root)}
      >
        <AppBar
          position="fixed"
          className={classnames(classes.appBar, {
            open: isMenu,
          })}
        >
          <ActionBar
            toggleNetwork={toggleNetwork}
            isNetwork={isNetwork}
          />
          {/* <TitleBar title={title} /> */}
        </AppBar>
        <Drawer
          variant="permanent"
          className={classnames(classes.drawer, {
            open: isMenu,
            closed: !isMenu,
            [classes.drawerOpen]: isMenu,
            [classes.drawerClose]: !isMenu,
          })}
          classes={{
            paper: classnames({
              open: isMenu,
              closed: !isMenu,
              [classes.drawerOpen]: isMenu,
              [classes.drawerClose]: !isMenu,
            }),
          }}
        >
          <div className={classes.logo} role="button" onClick={toggleMenu}>
            {/* FIXME get light and dark theme assets */}
            {theme === 'light' ? <Logo /> : <Logo />}
            {isMenu && theme === 'light' ? (
              <div className={classes.logo_text}>
                <LogoTextDark
                  style={{
                    opacity: isMenu ? 1 : 0, transition: '.3s ease',
                  }}
                />
                <DevnetBadge
                  style={{
                    opacity: isMenu ? 1 : 0, transition: '.3s ease',
                  }}
                />
              </div>
            ) : (
              <div className={classes.logo_text}>
                <LogoTextDark
                  style={{
                    opacity: isMenu ? 1 : 0, transition: '.3s ease',
                  }}
                />
                <DevnetBadge
                  style={{
                    opacity: isMenu ? 1 : 0, transition: '.3s ease',
                  }}
                />
              </div>
            )}
          </div>
          <MenuItems />
        </Drawer>
      </div>
    </ClickAwayListener>
  );
};

export default Desktop;
