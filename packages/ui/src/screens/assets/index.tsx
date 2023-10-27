import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';
import Layout from '@/components/layout';
import List from '@/screens/assets/components/list';
import useStyles from '@/screens/assets/styles';

const Assets = () => {
  const { t } = useTranslation('assets');
  const { classes } = useStyles();

  return (
    <>
      <NextSeo
        title={t('assets') ?? undefined}
        openGraph={{
          title: t('assets') ?? undefined,
        }}
      />
      <Layout navTitle={t('assets') ?? undefined} className={classes.root}>
        <Typography variant="h1">{t('assets')}</Typography>
        <List />
      </Layout>
    </>
  );
};

export default Assets;
