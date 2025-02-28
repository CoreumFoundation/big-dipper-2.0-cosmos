import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import List from '@/screens/blocks/components/list';
import useStyles from '@/screens/blocks/styles';

const Blocks = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('blocks');

  return (
    <>
      <NextSeo
        title={t('blocks') ?? undefined}
        openGraph={{
          title: t('blocks') ?? undefined,
        }}
      />
      <Layout navTitle={t('blocks') ?? undefined} className={classes.root}>
        <List />
      </Layout>
    </>
  );
};

export default Blocks;
