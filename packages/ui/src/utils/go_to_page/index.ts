import chainConfig from '@/chainConfig';

const { prefix, xrplExplorer } = chainConfig();

export const HOME = '/';
export const BLOCKS = '/blocks';
export const BLOCK_DETAILS = (slot: string | number): string => `/blocks/${slot}`;
export const VALIDATOR_DETAILS = (address: string): string => `/validators/${address}`;
export const VALIDATORS = '/validators';
export const TRANSACTIONS = '/transactions';
export const TRANSACTION_DETAILS = (tx: string): string => `/transactions/${tx}`;
export const ASSETS = '/assets';
export const PROPOSALS = '/proposals';
export const PROPOSAL_DETAILS = (id: string | number): string => `/proposals/${id}`;
export const ACCOUNT_DETAILS = (address: string): string => `/accounts/${address}`;
export const PARAMS = '/params';
export const PROFILE_DETAILS = (dtag: string): string => `/${dtag}`;
export const ASSETS_DETAILS = (asset: string): string => `/assets/${asset}`;

export const XRPL_ACCOUNT_DETAILS = (address: string): string =>
  `${xrplExplorer}/accounts/${address}`;
export const XRPL_TRANSACTION_DETAILS = (tx: string): string =>
  `${xrplExplorer}/transactions/${tx}`;

/**
 * Helper to determine if we are routing to validator details or account details
 * @param address
 * @returns
 */
export const ADDRESS_DETAILS = (address: string) =>
  address?.includes(prefix.validator) ? VALIDATOR_DETAILS(address) : ACCOUNT_DETAILS(address);
