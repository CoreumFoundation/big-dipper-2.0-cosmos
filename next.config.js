const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  poweredByHeader: false,
  publicRuntimeConfig: {
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    NEXT_PUBLIC_GRAPHQL_WS: process.env.NEXT_PUBLIC_GRAPHQL_WS,
    NEXT_PUBLIC_RPC_WEBSOCKET: process.env.NEXT_PUBLIC_RPC_WEBSOCKET,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
