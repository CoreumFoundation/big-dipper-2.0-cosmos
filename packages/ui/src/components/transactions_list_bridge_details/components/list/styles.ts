import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
  listItem: {
    marginTop: 10,
    background: theme.palette.background.paper,
  },
  amount: {
    fontSize: theme.spacing(2),
  },
  decimal: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.secondary,
  },
  denom: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(1.75),
  },
  route: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  arrows: {
    transform: 'rotate(-90deg)',
  },
}));

export default useStyles;
