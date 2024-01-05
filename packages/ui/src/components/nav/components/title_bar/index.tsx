import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import useStyles from '@/components/nav/components/title_bar/styles';
import { formatMarket } from '@/components/nav/components/title_bar/utils';
import { AtomState } from '@/recoil/market';

type TitleBarProps = {
  className?: string;
  marketState: AtomState;
};

const TitleBar: FC<TitleBarProps> = ({ className, marketState }) => {
  const { t } = useTranslation('common');
  const { classes, cx } = useStyles();
  const market = formatMarket(marketState);

  return (
    <div className={cx(classes.root, className)}>
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
