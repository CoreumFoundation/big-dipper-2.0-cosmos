import Box from '@/components/box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { ExtendedAssetFTType } from '../../types';
import useStyles from './styles';

type AssetDetailsOverviewProps = {
  className?: string;
  asset: ExtendedAssetFTType;
};

const AssetDetailsOverview: FC<AssetDetailsOverviewProps> = ({ asset, className }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('assets');

  const {
    subunit,
    precision,
    globally_frozen,
    holders,
    issuer,
    minting_enabled,
    burning_enabled,
    freezing_enabled,
    whitelisting_enabled,
    burn_rate,
    send_commission_rate,
  } = asset;

  const preDividerDataItems = [
    {
      key: 'subunit',
      name: (
        <Typography variant="h4" className="label">
          {t('subunit')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {subunit}
        </Typography>
      ),
    },
    {
      key: 'precision',
      name: (
        <Typography variant="h4" className="label">
          {t('precision')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {precision}
        </Typography>
      ),
    },
    {
      key: 'globally_frozen',
      name: (
        <Typography variant="h4" className="label">
          {t('globally_frozen')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {globally_frozen}
        </Typography>
      ),
    },
    {
      key: 'holders',
      name: (
        <Typography variant="h4" className="label">
          {t('holders')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {holders}
        </Typography>
      ),
    },
  ];

  const postDividerDataItems = [
    {
      key: 'minting_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('minting')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {minting_enabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'burning_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('burning')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {burning_enabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'freezing_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('freezing')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {freezing_enabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'whitelisting_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('whitelisting')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {whitelisting_enabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'burn_rate',
      name: (
        <Typography variant="h4" className="label">
          {t('burn_rate')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {burn_rate}
        </Typography>
      ),
    },
    {
      key: 'send_commission_rate',
      name: (
        <Typography variant="h4" className="label">
          {t('send_commission_rate')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {send_commission_rate}
        </Typography>
      ),
    },
  ];

  return (
    <Box className={className}>
      <div className={classes.assetOverviewRoot}>
        <div className={classes.statusRoot}>
          {preDividerDataItems.map((x) => (
            <div key={x.key} className={classes.statusItem}>
              {x.name}
              {x.value}
            </div>
          ))}
        </div>
        <div className={classes.statusRoot}>
          <div className={classes.statusItem}>
            <Typography variant="h4" className="label">
              {t('issuer')}
            </Typography>
            <Typography variant="body1" className="value">
              {issuer}
            </Typography>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.statusRoot}>
          {postDividerDataItems.map((x) => (
            <div key={x.key} className={classes.statusItem}>
              {x.name}
              {x.value}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default AssetDetailsOverview;
