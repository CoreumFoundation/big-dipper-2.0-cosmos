import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import useStyles from '@/screens/assets/components/list/components/mobile/component/single_asset/styles';

type SingleAssetProps = {
  className?: string;
  name: string;
  tokenType: string;
  price: string;
  priceChange: string;
  supply: string;
  marketCap: string;
  holders: string;
};

const SingleAsset: FC<SingleAssetProps> = ({
  className,
  name,
  tokenType,
  price,
  priceChange,
  supply,
  marketCap,
  holders,
}) => {
  const { t } = useTranslation('assets');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.item}>
        <Typography variant="h4" className="label">
          {t('asset')}
        </Typography>
        <div className={classes.nameBlock}>
          <div className={classes.assetLogo}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7162_2200)">
                <rect width="32" height="32" rx="16" fill="#25D695" />
                <path
                  d="M16.0014 13.4399C15.4951 13.4399 15.0001 13.5901 14.5791 13.8714C14.1582 14.1527 13.83 14.5525 13.6363 15.0203C13.4425 15.4881 13.3918 16.0028 13.4906 16.4994C13.5894 16.996 13.8332 17.4521 14.1912 17.8101C14.5492 18.1682 15.0054 18.412 15.502 18.5108C15.9986 18.6095 16.5133 18.5588 16.9811 18.3651C17.4489 18.1713 17.8487 17.8432 18.13 17.4222C18.4113 17.0012 18.5614 16.5063 18.5614 15.9999C18.5614 15.321 18.2917 14.6698 17.8116 14.1897C17.3315 13.7097 16.6804 13.4399 16.0014 13.4399Z"
                  fill="white"
                />
                <path
                  d="M16.0007 5.76002C14.6557 5.75836 13.3237 6.02245 12.081 6.53712C10.8384 7.05179 9.70971 7.80689 8.75977 8.75906L12.3822 12.3815C13.098 11.6649 14.0103 11.1768 15.0036 10.9788C15.9969 10.7808 17.0267 10.8819 17.9625 11.2693C18.8984 11.6566 19.6983 12.3129 20.2612 13.155C20.824 13.9971 21.1244 14.9872 21.1244 16C21.1244 17.0129 20.824 18.003 20.2612 18.8451C19.6983 19.6872 18.8984 20.3434 17.9625 20.7308C17.0267 21.1181 15.9969 21.2192 15.0036 21.0213C14.0103 20.8233 13.098 20.3351 12.3822 19.6186L8.75977 23.241C9.95053 24.4317 11.4166 25.3104 13.028 25.7991C14.6395 26.2879 16.3466 26.3718 17.9982 26.0432C19.6498 25.7147 21.1949 24.9839 22.4966 23.9156C23.7983 22.8473 24.8164 21.4745 25.4609 19.9187C26.1053 18.363 26.3561 16.6723 26.1911 14.9965C26.026 13.3206 25.4503 11.7113 24.5147 10.3112C23.5792 8.91098 22.3128 7.76313 20.8277 6.96928C19.3426 6.17543 17.6847 5.76008 16.0007 5.76002Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_7162_2200">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={classes.nameColumn}>
            <Typography variant="body1" className={classes.name}>
              {name}
            </Typography>
            <Typography variant="body1" className={classes.chainRow}>
              CORE
              <span className={classes.nameChain}>Chain</span>
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('token_type')}
          </Typography>
          <Typography variant="body1">{t(tokenType)}</Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('price')}
          </Typography>
          <Typography variant="body1" className={classes.priceBlock}>
            $ {price}
            <span
              className={cx(classes.priceChange, {
                up: +priceChange > 0,
                down: +priceChange < 0,
              })}
            >
              {priceChange}%
            </span>
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('supply')}
          </Typography>
          <Typography variant="body1">{supply}</Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('market_cap')}
          </Typography>
          <Typography variant="body1">{marketCap}</Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('holders')}
          </Typography>
          <Typography variant="body1">{holders}</Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('last_7_days')}
          </Typography>
          <Typography variant="body1">{t('last7Days')}</Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleAsset;
