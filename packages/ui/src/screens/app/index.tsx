import chainConfig from '@/chainConfig';
import useApollo from '@/graphql/useApollo';
import { useWindowOrigin } from '@/hooks/use_window';
import Main, { MainProps } from '@/screens/app/components/main';
import { useApp } from '@/screens/app/hooks';
import {
  ADDITIONAL_LINK_TAGS_SEO,
  ADDITIONAL_META_TAGS,
  OPEN_GRAPH_SEO,
  TWITTER_SEO,
} from '@/screens/app/utils';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { RecoilRoot } from 'recoil';

const { title } = chainConfig();

function MyApp(props: MainProps<{ initialApolloState?: NormalizedCacheObject }>) {
  useApp();
  const { pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { t } = useTranslation();
  const { location } = useWindowOrigin();

  return (
    <RecoilRoot>
      <DefaultSeo
        titleTemplate={`${title}`}
        title={t('common:coreumExplorer') ?? undefined}
        description={t('common:description') ?? undefined}
        openGraph={{
          title: `${title}`,
          description: t('common:description') ?? undefined,
          url: location,
          ...OPEN_GRAPH_SEO,
        }}
        twitter={TWITTER_SEO}
        additionalLinkTags={ADDITIONAL_LINK_TAGS_SEO}
        additionalMetaTags={ADDITIONAL_META_TAGS}
      />
      <ApolloProvider client={apolloClient}>
        <Main {...props} />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
