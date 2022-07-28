import React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import classnames from 'classnames';
import {
  Layout, Box, LoadAndExist, NoData,
} from '@components';
import { useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@recoil/profiles';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { useBlocks } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Blocks = () => {
  const { t } = useTranslation('blocks');
  const { isDesktop } = useScreenSize();
  const classes = useStyles();
  const {
    state, loadMoreItems, itemCount, isItemLoaded,
  } = useBlocks();

  const proposerProfiles = useProfilesRecoil(
    state.items.map((x) => x.proposer),
  );
  const mergedDataWithProfiles = state.items.map((x, i) => {
    return {
      ...x,
      proposer: proposerProfiles[i],
    };
  });

  return (
    <>
      <NextSeo
        title={t('blocks')}
        openGraph={{
          title: t('blocks'),
        }}
      />
      <Layout navTitle={t('blocks')} className={classes.root}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <Typography variant="h1">{t('blocks')}</Typography>
          <Box className={classnames(classes.box, 'scrollbar')}>
            {!state.items.length ? (
              <NoData />
            ) : (
              <>
                {isDesktop ? (
                  <Desktop
                    items={mergedDataWithProfiles}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                    isItemLoaded={isItemLoaded}
                  />
                ) : (
                  <Mobile
                    items={mergedDataWithProfiles}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                    isItemLoaded={isItemLoaded}
                  />
                )}
              </>
            )}
          </Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Blocks;
