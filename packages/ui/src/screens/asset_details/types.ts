export interface AssetLink {
  type: string;
  link: string;
}

export interface SocialMediaAssetLink {
  type: string;
  link: string;
}

export interface ExtendedAssetFTType {
  id: number;
  name: string;
  description: string;
  logo: string;
  subunit: string;
  precision: string;
  globally_frozen: string;
  holders: string;
  issuer: string;
  minting_enabled: boolean;
  burning_enabled: boolean;
  freezing_enabled: boolean;
  whitelisting_enabled: boolean;
  burn_rate: string;
  send_commission_rate: string;
  price: string;
  price_usd: string;
  price_change: string;
  market_cap: string;
  total_supply: string;
  token_type: string;
  chain: string;
  address: string;
  links: AssetLink[];
  social_media: SocialMediaAssetLink[];
  price_changes_7days: any[];
}

export interface AssetDetailsState {
  exists: boolean;
  asset: ExtendedAssetFTType;
}
