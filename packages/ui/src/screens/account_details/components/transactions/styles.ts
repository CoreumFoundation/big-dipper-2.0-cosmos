import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiTypography-h2': {
      marginBottom: theme.spacing(2),
      fontSize: '20px',
      lineHeight: '30px',
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
