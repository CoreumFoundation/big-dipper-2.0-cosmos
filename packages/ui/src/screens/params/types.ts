export interface Staking {
  bondDenom: string;
  unbondingTime: number;
  maxEntries: number;
  historicalEntries: number;
  maxValidators: number;
  minSelfDelegation: TokenUnit;
}

export interface Slashing {
  downtimeJailDuration: number;
  minSignedPerWindow: number;
  signedBlockWindow: number;
  slashFractionDoubleSign: number;
  slashFractionDowntime: number;
}

export interface Minting {
  blocksPerYear: number;
  goalBonded: number;
  inflationMax: number;
  inflationMin: number;
  inflationRateChange: number;
  mintDenom: string;
}

export interface Distribution {
  communityTax: number;
  withdrawAddressEnabled: boolean;
}

export interface Gov {
  minDeposit: TokenUnit;
  maxDepositPeriod: number;
  quorum: number;
  threshold: number;
  vetoThreshold: number;
  votingPeriod: number;
}

export interface FeeModel {
  maxDiscount: number;
  maxBlockGas: number;
  initialGasPrice: number;
  longEmaBlockLength: number;
  shortEmaBlockLength: number;
  maxGasPriceMultiplier: number;
  escalationStartFraction: number;
}

export interface NFT {
  nftMintFee: TokenUnit;
}

export interface FT {
  ftIssueFee: TokenUnit;
  tokenUpgradeGracePeriod?: number | undefined;
  tokenUpgradeDecisionTimeout?: string | undefined;
}

export interface Auth {
  txSigLimit: number | undefined;
  maxMemoCharacters: number | undefined;
  txSizeCostPerByte: number | undefined;
  sigVerifyCostEd25519: number | undefined;
  sigVerifyCostSecp256k1: number | undefined;
}

export interface Dex {
  order_reserve: {
    amount: string;
    denom: string;
  };
  price_tick_exponent: number;
  max_orders_per_denom: number;
  default_unified_ref_amount: string;
}

export interface Pse {
  clearing_account_mappings: Array<{
    clearing_account: string;
    recipient_addresses: Array<string>;
  }>;
  excluded_addresses: Array<string> | null;
}

export interface ParamsState {
  loading: boolean;
  exists: boolean;
  staking: Staking | null;
  slashing: Slashing | null;
  minting: Minting | null;
  distribution: Distribution | null;
  gov: Gov | null;
  feeModel: FeeModel | null;
  nft: NFT | null;
  ft: FT | null;
  auth: Auth | null;
  dex: Dex | null;
  pse: Pse | null;
}
