import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import useStyles from '@/screens/assets/components/list/components/mobile/component/single_asset/styles';
import Image from 'next/image';

const SingleAsset = ({
  className,
  tokenType,
  supply,
  holders,
  logo_URIs,
  denom,
  display,
  chain,
}: any) => {
  const { t } = useTranslation('assets');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.item}>
        <Typography variant="h4" className="label">
          {t('asset')}
        </Typography>
        <div className={classes.nameBlock}>
          {logo_URIs.svg || logo_URIs.png ? (
            <div className={classes.assetLogo}>
              <Image src={logo_URIs.svg || logo_URIs.png} alt={denom} width={32} height={32} />
            </div>
          ) : (
            <svg
              className={classes.assetLogo}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8758_4819)">
                <rect width="32" height="32" rx="16" fill="url(#paint0_linear_8758_4819)" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.3696 10.1001C19.5365 9.42686 20.3087 8.33279 20.6046 7.12064C19.2048 6.39606 17.6313 6 16.0003 6C14.3693 6 12.7946 6.39664 11.3945 7.1215C11.4989 7.54817 11.665 7.96732 11.8959 8.36714C13.2044 10.6315 16.1029 11.4075 18.3696 10.1001ZM6 15.5436C7.19869 15.8937 8.5332 15.7731 9.7001 15.0999C11.9669 13.7925 12.7436 10.897 11.4348 8.63268C11.2039 8.23315 10.9234 7.87981 10.6052 7.57642C9.27848 8.42397 8.14885 9.58617 7.33335 10.9949L7.33046 11.0001L7.32439 11.0105C6.51323 12.4184 6.07167 13.9743 6 15.5436ZM26.0006 16.4563C25.9286 18.0293 25.485 19.589 24.6698 20.9998C23.8543 22.4108 22.7233 23.5748 21.3951 24.4235C21.0769 24.1201 20.7963 23.7667 20.5654 23.3669C19.2567 21.1026 20.0334 18.2071 22.3002 16.9C23.4671 16.2268 24.8019 16.1059 26.0006 16.4563ZM16.0008 26C17.6318 26 19.2065 25.6034 20.6063 24.8785C20.5022 24.4516 20.3361 24.0324 20.1052 23.6326C18.7964 21.3685 15.8979 20.5926 13.6312 21.9C12.4643 22.5732 11.6921 23.6673 11.3965 24.8791C12.796 25.6037 14.3701 26 16.0005 26H16.0008ZM10.6055 24.4236C9.27732 23.5746 8.14654 22.411 7.33104 21.0002V20.9996C6.51525 19.5886 6.07167 18.0286 6 16.4553C8.04973 15.8546 10.3197 16.703 11.4351 18.6328C12.5506 20.5626 12.1512 22.9508 10.6055 24.4236ZM20.5653 13.3672C21.6807 15.297 23.951 16.1457 26.0007 15.5447C25.929 13.9714 25.4851 12.4112 24.6696 10.9998L24.6656 10.9929C23.8504 9.58502 22.7211 8.42339 21.3949 7.57642C19.8495 9.04924 19.4501 11.4374 20.5653 13.3672Z"
                  fill="url(#paint1_linear_8758_4819)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_8758_4819"
                  x1="27.9808"
                  y1="27.9808"
                  x2="3.11788"
                  y2="3.11454"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2A2F35" />
                  <stop offset="0.99" stopColor="#324254" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_8758_4819"
                  x1="6"
                  y1="6"
                  x2="26"
                  y2="26"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#666666" />
                </linearGradient>
                <clipPath id="clip0_8758_4819">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          <div className={classes.nameColumn}>
            <Typography variant="body1" className={classes.name}>
              {display}
            </Typography>
            <Typography variant="body1" className={classes.chainRow}>
              <span className={classes.nameChain}>Chain: {chain}</span>
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
