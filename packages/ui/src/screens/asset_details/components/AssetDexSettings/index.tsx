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
  assetDexSettings: any;
}

const AssetDexSettings: FC<AssetDexSettingsProps> = ({
  asset,
  className,
  dex,
  assetDexSettings,
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('assets');

  const { dexSettings, features } = asset;
  const { default_unified_ref_amount } = dex;

  const refAmount = useMemo(() => {
    const currentRefAmount =
      assetDexSettings?.action_asset_ft_dex_settings?.unified_ref_amount ||
      dexSettings?.unified_ref_amount ||
      default_unified_ref_amount;

    if (currentRefAmount > 1) {
      if (currentRefAmount <= 100000000000000000000000) {
        return numeral(currentRefAmount).format('0,0');
      }
    }

    return currentRefAmount;
  }, [assetDexSettings, default_unified_ref_amount, dexSettings?.unified_ref_amount]);

  const currentWhitelistedDenoms = useMemo(() => {
    const denoms = assetDexSettings?.action_asset_ft_dex_settings?.whitelisted_denoms?.length
      ? assetDexSettings?.action_asset_ft_dex_settings?.whitelisted_denoms
      : dexSettings?.whitelisted_denoms;

    return denoms ? denoms.map((item: string) => <p key={item}>{item}</p>) : t('no_denoms');
  }, [assetDexSettings, dexSettings?.whitelisted_denoms, t]);

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
    [refAmount, t]
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
          {currentWhitelistedDenoms}
        </Typography>
      ),
    };
  }, [asset.denom, classes.denomsWrapper, cx, currentWhitelistedDenoms, features, t]);

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
