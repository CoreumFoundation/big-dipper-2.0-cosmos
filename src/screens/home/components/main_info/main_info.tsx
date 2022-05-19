import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@src/components';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

const MainInfo: React.FC<{
  className?: string
}> = ({
  className,
}) => {
  const { t } = useTranslation('home');
  const classes = useStyles();

  return (
    <Box className={classnames(classes.root, className)}>
      <Typography variant="h2" className={classes.label}>
        {t('consensus')}
      </Typography>
      <div>
        hehe
      </div>
    </Box>
  );
};

export default MainInfo;
