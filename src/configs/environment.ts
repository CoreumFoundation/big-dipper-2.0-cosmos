import getConfig from 'next/config';

/**
 * Single point of initialization for environment variables
 */

const { publicRuntimeConfig } = getConfig();

export const GRAPHQL_WS = publicRuntimeConfig.NEXT_PUBLIC_GRAPHQL_WS
  || process.env.NEXT_PUBLIC_GRAPHQL_WS;

export const GRAPHQL_URL = publicRuntimeConfig.NEXT_PUBLIC_GRAPHQL_URL
  || process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const RPC_WEBSOCKET = publicRuntimeConfig.NEXT_PUBLIC_RPC_WEBSOCKET
  || process.env.NEXT_PUBLIC_RPC_WEBSOCKET;
