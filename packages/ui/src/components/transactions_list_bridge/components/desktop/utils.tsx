export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'route',
    width: 17,
  },
  {
    key: 'amount',
    width: 17,
  },
  {
    key: 'txHash_1',
    width: 18,
  },
  {
    key: 'txHash_2',
    align: 'right',
    width: 18,
  },
  {
    key: 'destination',
    align: 'right',
    width: 18,
  },
  {
    key: 'time',
    align: 'right',
    width: 12,
  },
];
