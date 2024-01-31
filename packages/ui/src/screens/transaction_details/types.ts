import { Asset } from '../assets/hooks';

export interface OverviewType {
  hash: string;
  height: number;
  timestamp: string;
  fee: TokenUnit;
  gasUsed: number;
  gasWanted: number;
  success: boolean;
  memo: string;
  error: string;
  sender: string;
  receiver: string;
  amount: any;
}

export interface TransactionState {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  logs: null | [];
  messages: {
    filterBy: string;
    viewRaw: boolean;
    items: unknown[];
  };
  assets: Asset[];
  metadatas: any[];
}
