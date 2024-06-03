import Color from 'color';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr auto 1fr',
    gap: 8,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1.5fr auto 1fr',
      gridTemplateRows: 'unset',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(2),
    gap: theme.spacing(1),
    lineHeight: 1.5,
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(2.5),
    lineHeight: 1.5,

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(7),
    },
  },
  chart: {
    display: 'grid',
    placeItems: 'stretch',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.error.main,
  },
  container: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    '& #price-chart': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 'unset',
      justifyContent: 'unset',
    },
  },
  divider: {
    height: '90%',
    placeSelf: 'end',
  },
  priceChange: {
    fontSize: theme.spacing(1.5),
    padding: `${theme.spacing(0.25)} ${theme.spacing(0.75)}`,
    color: theme.palette.text.primary,
    background: Color(theme.palette.text.primary).alpha(0.1).toString(),
    borderRadius: 4,
    fontWeight: 500,
    marginLeft: theme.spacing(0.75),
    lineHeight: theme.spacing(2.25),
  },
  priceUp: {
    color: theme.palette.custom.tags.two,
    background: Color(theme.palette.custom.tags.two).alpha(0.1).toString(),
  },
  priceDown: {
    color: theme.palette.custom.tags.five,
    background: Color(theme.palette.custom.tags.five).alpha(0.1).toString(),
  },
}));

export default useStyles;
