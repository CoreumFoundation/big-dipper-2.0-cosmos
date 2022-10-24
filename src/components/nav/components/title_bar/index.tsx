import React, {
  useEffect, useState,
} from 'react';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import { readMarket } from '@recoil/market';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useStyles } from './styles';
import { formatMarket } from './utils';

const TitleBar: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [price, set] = useState<number>();

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=coreum&vs_currencies=usd',
      )
      .then(({ data }) => {
        set(data.coreum.usd);
      });
  }, []);

  const { t } = useTranslation('common');
  const classes = useStyles();
  const marketState = useRecoilValue(readMarket);

  const market = formatMarket({
    ...marketState,
    price,
  });

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classes.content}>
        {market.map((x) => (
          <div key={x.key} className={classes.item}>
            <Typography variant="body1" className="label">
              {t(x.key)}
            </Typography>
            <Typography variant="body1" className="data">
              {x.data}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleBar;
