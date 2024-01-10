import Box from '@/components/box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
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

  const dataLinks = useMemo(
    () => ({
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
    }),
    [urls, classes.linkRow, classes.linkIcon, classes.linkItem, t]
  );

  const dataSocialMedia = useMemo(
    () => ({
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
    }),
    [social_media, classes.linkRow, classes.socialMediaLink, t]
  );

  const dataItems = useMemo(() => {
    const dataArr = [];

    if (Object.values(urls).length) {
      dataArr.push(dataLinks);
    }

    if (Object.values(social_media).length) {
      dataArr.push(dataSocialMedia);
    }

    return dataArr;
  }, [dataLinks, urls, dataSocialMedia, social_media]);

  return (
    <Box className={className}>
      <div className={classes.assetOverviewRoot}>
        <div className={classes.assetProfile}>
          {logo_URIs.svg || logo_URIs.png ? (
            <div className={classes.assetProfileLogo}>
              <Image
                src={logo_URIs.svg || logo_URIs.png}
                alt={display}
                width={32}
                height={32}
                className={classes.assetLogo}
              />
            </div>
          ) : (
            ''
          )}
          <div className={classes.assetProfileData}>
            <div className={classes.assetName}>
              <div className={classes.assetNameDisplay}>{display}</div>
              <div className={classes.chainRow}>
                <div className={classes.nameChain}>Chain: Coreum</div>
              </div>
            </div>
            <div className={classes.assetDescription}>{description}</div>
          </div>
        </div>
        {dataItems.length ? (
          <>
            <Divider className={classes.divider} />
            <div className={classes.statusRoot}>
              {dataItems.map((x) => (
                <div key={x.key} className={classes.statusItem}>
                  {x.name}
                  {x.value}
                </div>
              ))}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </Box>
  );
};

export default AssetOverview;
