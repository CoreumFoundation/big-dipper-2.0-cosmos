import React from 'react';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
// import useTranslation from 'next-translate/useTranslation';
import { Box } from '@src/components';
import { TitleBar } from '@src/components/nav/components';
import {
  Divider, Typography,
} from '@material-ui/core';
import { useStyles } from './styles';

const PriceChart = dynamic(() => import('./price_chart'), { ssr: false });

const MainInfo: React.FC<{
  className?: string
}> = ({
  className,
}) => {
  // const { t } = useTranslation('home');
  const classes = useStyles();

  return (
    <Box className={classnames(classes.root, className)}>
      <div className={classes.container}>
        <Typography variant="h2" className={classes.label}>
          Coreum
        </Typography>
        <PriceChart />
      </div>
      <Divider orientation="vertical" className={classes.divider} />
      <TitleBar />
    </Box>
  );
};

export default MainInfo;
