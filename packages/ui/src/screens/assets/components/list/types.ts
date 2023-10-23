export interface AssetFTType {
  id: number;
  name: string;
  logo: string;
  token_type: string;
  price: string;
  price_change: string;
  supply: string;
  holders: string;
}

export interface AssetsState {
  loading: boolean;
  exists: boolean;
  tab: number;
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  items: AssetFTType[];
}
