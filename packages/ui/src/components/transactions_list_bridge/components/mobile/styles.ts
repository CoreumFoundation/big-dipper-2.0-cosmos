import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    paddingLeft: theme.spacing(2),
  },
  denom: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(1.75),
  },
  amount: {
    fontSize: theme.spacing(2),
  },
  decimal: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.secondary,
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.primary,
    width: '100%',
  },
  formatDate: {
    display: 'flex',
    columnGap: theme.spacing(0.5),
    width: '100%',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.75),
  },
}));

export default useStyles;
