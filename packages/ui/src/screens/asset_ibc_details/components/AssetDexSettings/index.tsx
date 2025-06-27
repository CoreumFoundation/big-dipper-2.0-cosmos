import Box from '@/components/box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import numeral from 'numeral';
import { FC, useMemo } from 'react';
import chainConfig from '@/chainConfig';
import useStyles from './styles';

const { primaryTokenUnit } = chainConfig();

interface AssetDexSettingsProps {
  className?: string;
  asset: any;
  dex: any;
}

const AssetDexSettings: FC<AssetDexSettingsProps> = ({ asset, className, dex }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('assets');

  const { dexSettings, features } = asset;
  const { default_unified_ref_amount } = dex;

  const refAmount = useMemo(() => {
    const currentRefAmount = dexSettings?.unified_ref_amount || default_unified_ref_amount;

    if (currentRefAmount > 1) {
      if (currentRefAmount <= 100000000000000000000000) {
        return numeral(currentRefAmount).format('0,0');
      }
    }

    return currentRefAmount;
  }, [default_unified_ref_amount, dexSettings?.unified_ref_amount]);

  const unifiedRefAmount = useMemo(
    () => ({
      key: 'unified_ref_amount',
      name: (
        <Typography variant="h4" className="label">
          {t('unified_ref_amount')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {refAmount}
        </Typography>
      ),
    }),
    [dexSettings, refAmount, t]
  );

  const whitelistedDenoms = useMemo(() => {
    if (
      !features?.find((item: string) => item === 'dex_whitelisted_denoms') ||
      asset.denom === primaryTokenUnit
    ) {
      return {
        key: 'whitelisted_denoms',
        name: (
          <Typography variant="h4" className="label">
            {t('whitelisted_denoms')}
          </Typography>
        ),
        value: (
          <Typography variant="body1" className={cx('value', classes.denomsWrapper)}>
            {t('all')}
          </Typography>
        ),
      };
    }

    return {
      key: 'whitelisted_denoms',
      name: (
        <Typography variant="h4" className="label">
          {t('whitelisted_denoms')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className={cx('value', classes.denomsWrapper)}>
          {dexSettings?.whitelisted_denoms.length
            ? dexSettings?.whitelisted_denoms.map((item: string) => <p key={item}>{item}</p>)
            : t('no_denoms')}
        </Typography>
      ),
    };
  }, [asset.denom, classes.denomsWrapper, cx, dexSettings?.whitelisted_denoms, features, t]);

  const dataItems = useMemo(() => {
    const items = [];

    if (unifiedRefAmount) {
      items.push(unifiedRefAmount);
    }

    items.push(whitelistedDenoms);

    return items;
  }, [unifiedRefAmount, whitelistedDenoms]);

  return (
    <Box className={className}>
      <div className={classes.mainWrapper}>
        {dataItems.map((x) => (
          <div key={x.key} className={classes.dexSettingsItem}>
            {x.name}
            {x.value}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default AssetDexSettings;
