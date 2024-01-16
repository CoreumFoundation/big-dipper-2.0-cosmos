import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  list: {
    minHeight: '500px',
    height: '50vh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      minHeight: '65vh',
    },
  },
  mobile: {
    height: '100%',
  },
  box: {
    paddingTop: `0 !important`,
    paddingRight: `0 !important`,
    paddingBottom: `0 !important`,
    paddingLeft: `${theme.spacing(2)} !important`,
    minHeight: '500px',
    height: `calc(100% - 60px) !important`,
    overflow: 'hidden !important',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      height: `calc(100% - 60px)`,
      minHeight: '65vh',
      padding: '0 !important',
    },
  },
}));

export default useStyles;
