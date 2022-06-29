import React from 'react';
import { LinearProgress } from '@material-ui/core';
import Logo from '@assets/logo.svg';
import LogoTextDark from '@assets/logo-text-dark.svg';
import { useStyles } from './styles';

const InitialLoad = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <div>
          <Logo />
          <LogoTextDark />
        </div>
        <LinearProgress className={classes.divider} />
      </div>
    </div>
  );
};

export default InitialLoad;
