import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateRows: 'auto',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1.5 fr 1.5fr',
    },
  },
  blockHeight: {
    background: theme.palette.custom.general.single_block,
  },
  blockTime: {
    background: theme.palette.custom.general.single_block,
  },
  price: {
    background: theme.palette.custom.general.single_block,
  },
  validators: {
    background: theme.palette.custom.general.single_block,
  },
}));

export default useStyles;
