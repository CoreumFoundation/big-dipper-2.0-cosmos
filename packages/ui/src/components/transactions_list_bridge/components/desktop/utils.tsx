export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'route',
    width: 12,
  },
  {
    key: 'amount',
    width: 15,
  },
  {
    key: 'sender',
    align: 'right',
    width: 15,
  },
  {
    key: 'destination',
    align: 'right',
    width: 15,
  },
  {
    key: 'txHash_1',
    width: 15,
  },
  {
    key: 'txHash_2',
    width: 15,
  },
  {
    key: 'time',
    align: 'right',
    width: 13,
  },
];