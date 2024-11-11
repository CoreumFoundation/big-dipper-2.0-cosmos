import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
    },
  },
  list: {
    minHeight: '500px',
    height: '50vh',
    [theme.breakpoints.up('lg')]: {
      minHeight: '65vh',
    },
  },
}));

export default useStyles;
