import Box from '@/components/box';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import NoData from '@/components/no_data';
import Desktop from '@/screens/blocks/components/desktop';
import Mobile from '@/screens/blocks/components/mobile';
import { useBlocks } from '@/screens/blocks/hooks';
import useStyles from '@/screens/blocks/styles';
import { useDisplayStyles } from '@/styles/useSharedStyles';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';

const Blocks = () => {
  const { t } = useTranslation('blocks');
  const { classes, cx } = useStyles();
  const display = useDisplayStyles().classes;
  const { state, loadMoreItems, itemCount, isItemLoaded } = useBlocks();

  let box: ReactNode;

  if (!state.items.length) {
    box = <NoData />;
  } else {
    box = (
      <>
        <Desktop
          items={state.items}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
          isItemLoaded={isItemLoaded}
          className={display.hiddenUntilLg}
        />
        <Mobile
          items={state.items}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
          isItemLoaded={isItemLoaded}
          className={display.hiddenWhenLg}
        />
      </>
    );
  }
  return (
    <>
      <NextSeo
        title={t('blocks') ?? undefined}
        openGraph={{
          title: t('blocks') ?? undefined,
        }}
      />
      <Layout
        navTitle={t('blocks') ?? undefined}
        className={classes.root}
        rootClassName={classes.layoutRoot}
        contentWrapperClassName={classes.layoutContentWrapper}
      >
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <Typography variant="h1">{t('blocks')}</Typography>
          <Box className={cx(classes.box, 'scrollbar')}>{box}</Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Blocks;
