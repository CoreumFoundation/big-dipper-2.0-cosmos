import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  list: {
    minHeight: '500px',
    height: '50vh',
    [theme.breakpoints.up('lg')]: {
      minHeight: '65vh',
    },
  },
  mobile: {
    height: '100%',
  },
  box: {
    minHeight: '500px',
    height: '50vh',
    overflow: 'hidden !important',
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      minHeight: '65vh',
      padding: '0 !important',
    },
  },
}));

export default useStyles;
