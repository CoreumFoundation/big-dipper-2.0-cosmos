import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Check from '@assets/icon-check.svg';
import Cross from '@assets/icon-cross.svg';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

const Result: React.FC<{
  className?: string;
  success?: boolean;
}> = ({
  className, success,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <div
      className={classnames(className, classes.root, {
        [classes.success]: success,
        [classes.fail]: !success,
      })}
    >
      {success ? (
        <>
          <Check />
          <Typography variant="body1">
            {t('success')}
          </Typography>
        </>
      ) : (
        <>
          <Cross />
          <Typography variant="body1">
            {t('fail')}
          </Typography>
        </>
      )}
    </div>
  );
};

export default Result;
