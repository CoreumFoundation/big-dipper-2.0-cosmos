import React from 'react';
import { LinearProgress } from '@material-ui/core';
import LogoFull from '@assets/logo-full.svg';
import { useStyles } from './styles';

const InitialLoad = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.logo}>
          <LogoFull />
        </div>
        <LinearProgress className={classes.divider} />
      </div>
    </div>
  );
};

export default InitialLoad;
