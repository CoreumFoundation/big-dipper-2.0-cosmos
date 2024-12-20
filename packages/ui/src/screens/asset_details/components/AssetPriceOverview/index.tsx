import Box from '@/components/box';
import { getFormatString } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import numeral from 'numeral';
import { FC } from 'react';
import useStyles from './styles';

interface AssetPriceOverviewProps {
  className?: string;
  asset: any;
}

const AssetPriceOverview: FC<AssetPriceOverviewProps> = ({ asset, className }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('assets');

  const { tokenType, supply, display, exponent } = asset;

  const value = supply / 10 ** exponent;
  let supplyValue = numeral(value).format(getFormatString(exponent));

  if (Number(value) < 1) {
    supplyValue = value.toFixed(exponent);
  }

  const dataItems = [
    // {
    //   key: 'market_cap',
    //   name: (
    //     <Typography variant="h4" className="label">
    //       {t('market_cap')}
    //     </Typography>
    //   ),
    //   value: (
    //     <Typography variant="body1" className="value">
    //       $ {numeral(market_cap).format('0,0')}
    //     </Typography>
    //   ),
    // },
    {
      key: 'total_supply',
      name: (
        <Typography variant="h4" className="label">
          {t('total_supply')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {supplyValue} {display.toUpperCase()}
        </Typography>
      ),
    },
    {
      key: 'token_type',
      name: (
        <Typography variant="h4" className="label">
          {t('token_type')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          <span className={classes.tokenTypeBlock}>
            <span className={classes.tokenType}>{tokenType}</span>
          </span>
        </Typography>
      ),
    },
  ];

  return (
    <Box className={className}>
      <div className={classes.assetOverviewRoot}>
        <div className={classes.pricesRoot}>
          <div className={classes.pricesContainer}>
            <div className={classes.pricesColumn}>
              {/* <div className={classes.priceDataRoot}>
                <div className={classes.priceItem}>
                  <Typography variant="h4" className="label">
                    {name} {t('price')} (CORE)
                  </Typography>
                  <Typography variant="body1" className="value">
                    <span>
                      {price_usd}
                      <span className="currency">USD</span>
                    </span>
                    <span className="priceChange down">{price_change}%</span>
                  </Typography>
                </div>
              </div> */}
              <div className={classes.statusRoot}>
                {dataItems.map((x) => (
                  <div key={x.key} className={classes.statusItem}>
                    {x.name}
                    {x.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className={classes.chart}>
            <AssetTradingChart data={price_changes_7days} />
          </div> */}
        </div>
      </div>
    </Box>
  );
};

export default AssetPriceOverview;
