import React from 'react';
import classnames from 'classnames';
import {
  Drawer,
  AppBar,
  ClickAwayListener,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { readTheme } from '@recoil/settings/selectors';
import CoreumDark from '@assets/coreum-dark.svg';
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
          {/* FIXME logo placement or svg split & redesign */}
          {theme === 'light' ? (
            <div className={classes.container}>
              <CoreumDark
                className="logo"
                onClick={toggleMenu}
                role="button"
              />
            </div>
          ) : (
            // <BigDipperLogoWhite
            //   className={classes.logo}
            //   onClick={toggleMenu}
            //   role="button"
            // />
            <div className={classes.container}>
              <CoreumDark
                className="logo"
                onClick={toggleMenu}
                role="button"
              />
            </div>
          )}
          <MenuItems />
        </Drawer>
      </div>
    </ClickAwayListener>
  );
};

export default Desktop;
