export interface BlockType {
  height: number;
  txs: number;
  timestamp: string;
  proposer: string;
  hash: string;
  moniker?: string;
  avatarUrl?: string;
}

export interface BlocksState {
  loading: boolean;
  exists: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: BlockType[];
}

export type ItemType = BlockType;
