export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'block',
    width: 10,
  },
  {
    key: 'hash',
    width: 10,
  },
  {
    key: 'type',
    width: 15,
  },
  {
    key: 'spender',
    width: 10,
  },
  {
    key: 'receiver',
    width: 10,
  },
  {
    key: 'amount',
    align: 'right',
    width: 10,
  },
  {
    key: 'fee',
    align: 'right',
    width: 10,
  },
  {
    key: 'messages',
    align: 'right',
    width: 5,
  },
  {
    key: 'result',
    align: 'right',
    width: 10,
  },
  {
    key: 'time',
    align: 'right',
    width: 10,
  },
];
