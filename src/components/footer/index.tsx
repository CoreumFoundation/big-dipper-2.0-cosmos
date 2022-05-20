import React from 'react';
import classnames from 'classnames';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { generalConfig } from '@src/configs';
import { useStyles } from './styles';

const Footer: React.FC<{className?: string}> = ({ className }) => {
  const classes = useStyles();
  const year = new Date().getFullYear();

  return (
    <div className={classnames(className, classes.root)}>
      <div className="footer__closing--container">
        <Typography className="footer__closing--text">
          {/* ============================= */}
          {/*
            WARNING: WE ARE USING APACHE 2.0 LICENSE
            DO YOUR RESEARCH BEFORE TRYING TO REMOVE/ EDIT THE FOLLOWING LINE(S)
            RESPECT OPEN SOURCE!!
          */}
          {/* ============================= */}
          <Trans
            i18nKey="common:copyright"
            components={[
              (
                // eslint-disable-next-line
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://raw.githubusercontent.com/forbole/big-dipper-2.0-cosmos/master/LICENSE"
                />
              ),
            ]}
            values={{
              name: generalConfig.maintainer.name,
            }}
          />
          {' '}
          {year}
        </Typography>
        <Typography className="footer__closing--text">
          <Trans
            i18nKey="common:maintainBy"
            components={[
              (
                // eslint-disable-next-line
                <a target="_blank" rel="noreferrer" href={generalConfig.maintainer.url} />
              ),
            ]}
            values={{
              name: generalConfig.maintainer.name,
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
