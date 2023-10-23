import { ReactNode } from 'react';

export const fetchColumns = (): {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
  component?: ReactNode;
  sortKey?: string;
  sort?: boolean;
}[] => [
  {
    key: 'id',
    width: 5,
  },
  {
    key: 'name',
    sortKey: 'name',
    width: 15,
    sort: true,
  },
  {
    key: 'token_type',
    sortKey: 'token_type',
    width: 13,
    sort: true,
  },
  {
    key: 'price',
    sortKey: 'price',
    width: 12,
    sort: true,
  },
  {
    key: 'supply',
    sortKey: 'supply',
    width: 15,
    sort: true,
  },
  {
    key: 'market_cap',
    sortKey: 'market_cap',
    width: 15,
    sort: true,
  },
  {
    key: 'holders',
    sortKey: 'holders',
    width: 10,
    sort: true,
  },
  {
    key: 'last7Days',
    width: 14,
    sort: false,
    align: 'right',
  },
];
