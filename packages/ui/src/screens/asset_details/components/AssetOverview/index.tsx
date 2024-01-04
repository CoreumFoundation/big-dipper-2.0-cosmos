import Box from '@/components/box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import Image from 'next/image';
import useStyles from './styles';
import { getURLIcon } from './icons';

type AssetOverviewProps = {
  className?: string;
  asset: any;
};

const AssetOverview: FC<AssetOverviewProps> = ({ asset, className }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('assets');

  const { display, description, urls, social_media, logo_URIs } = asset;

  const dataItems = [
    {
      key: 'links',
      name: (
        <Typography variant="h4" className="label">
          {t('links')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value links">
          {Object.keys(urls).map((linkItem: string) => {
            const icon = getURLIcon(linkItem);

            return (
              <a
                href={urls[linkItem]}
                target="_blank"
                rel="noreferrer"
                key={`link-${linkItem}`}
                className={classes.linkRow}
              >
                <span className={classes.linkItem}>
                  <span className={classes.linkIcon}>{icon}</span>
                  {t(linkItem)}
                </span>
              </a>
            );
          })}
        </Typography>
      ),
    },
    {
      key: 'social_medial',
      name: (
        <Typography variant="h4" className="label">
          {t('social_media')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value social-links">
          {Object.keys(social_media).map((linkItem) => {
            const icon = getURLIcon(linkItem);

            return (
              <a
                href={social_media[linkItem]}
                target="_blank"
                rel="noreferrer"
                key={`link-${linkItem}`}
                className={classes.linkRow}
              >
                <span className={classes.socialMediaLink}>{icon}</span>
              </a>
            );
          })}
        </Typography>
      ),
    },
  ];

  return (
    <Box className={className}>
      <div className={classes.assetOverviewRoot}>
        <div className={classes.assetProfile}>
          <div className={classes.assetProfileLogo}>
            <Image
              src={logo_URIs.svg}
              alt={display}
              width={32}
              height={32}
              className={classes.assetLogo}
            />
          </div>
          <div className={classes.assetProfileData}>
            <div className={classes.assetName}>
              {display}
              <div className={classes.chainRow}>
                <div className={classes.nameChain}>Chain: Coreum</div>
              </div>
              {/* <span className={classes.assetChain}>
                Chain: Coreum
              </span> */}
            </div>
            <div className={classes.assetDescription}>{description}</div>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.statusRoot}>
          {dataItems.map((x) => (
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

export default AssetOverview;
