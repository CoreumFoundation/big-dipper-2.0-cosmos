import { Asset } from '../assets/hooks';

export interface OverviewType {
  address: string;
  withdrawalAddress: string;
}

export interface BalanceType {
  available: TokenUnit;
  delegate: TokenUnit;
  unbonding: TokenUnit;
  reward: TokenUnit;
  commission?: TokenUnit;
  total: TokenUnit;
}

export interface OtherTokenType {
  denom: string;
  available: TokenUnit;
  reward: TokenUnit;
  commission: TokenUnit;
  logoURL?: string;
  displayName?: string;
  chain?: string;
  exponent?: number;
}

export interface RewardsType {
  [value: string]: TokenUnit;
}

export interface AccountDetailState {
  loading: boolean;
  balanceLoading: boolean;
  metadataLoading: boolean;
  exists: boolean;
  desmosProfile: DesmosProfile | null;
  overview: OverviewType;
  balance: BalanceType;
  assetsList: Asset[];
  assetsLoading: boolean;
  otherTokens: {
    data: OtherTokenType[];
    count: number;
  };
  rewards: RewardsType;
  metadatas: any[];
  domain: string;
  riskScoreData: {
    isAddressValid: boolean;
    level: number;
    score: number;
    verdict_time: number;
  } | null;
}
