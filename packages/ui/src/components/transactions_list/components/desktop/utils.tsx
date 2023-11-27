export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'hash',
    width: 15,
  },
  {
    key: 'type',
    width: 17,
  },
  {
    key: 'sender.receiver',
    width: 18,
  },
  {
    key: 'amount',
    align: 'right',
    width: 15,
  },
  {
    key: 'fee',
    align: 'right',
    width: 15,
  },
  {
    key: 'result',
    align: 'center',
    width: 9,
  },
  {
    key: 'time',
    align: 'right',
    width: 11,
  },
];
