import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import useStyles from '@/screens/assets/components/list/components/mobile/component/single_asset/styles';
import Image from 'next/image';

const SingleAsset = ({ className, tokenType, supply, holders, logo_URIs, denom, display }: any) => {
  const { t } = useTranslation('assets');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.item}>
        <Typography variant="h4" className="label">
          {t('asset')}
        </Typography>
        <div className={classes.nameBlock}>
          {(logo_URIs.svg || logo_URIs.png) && (
            <div className={classes.assetLogo}>
              <Image src={logo_URIs.svg || logo_URIs.png} alt={denom} width={32} height={32} />
            </div>
          )}
          <div className={classes.nameColumn}>
            <Typography variant="body1" className={classes.name}>
              {display}
            </Typography>
            <Typography variant="body1" className={classes.chainRow}>
              <span className={classes.nameChain}>Chain: Coreum</span>
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('token_type')}
          </Typography>
          <Typography variant="body1" component="div">
            <div className={classes.tokenTypeBlock}>
              <div className={classes.tokenType}>{tokenType.toUpperCase()}</div>
            </div>
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('supply')}
          </Typography>
          <Typography variant="body1">{supply}</Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('holders')}
          </Typography>
          <Typography variant="body1">{holders}</Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleAsset;
