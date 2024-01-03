import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  paginate: {
    marginTop: theme.spacing(3),
  },
  '.MuiTypography-h2': {
    marginBottom: theme.spacing(2),
    fontSize: '20px',
    lineHeight: '30px',
  },
  root: {
    '& .MuiTypography-h2': {
      marginBottom: theme.spacing(2),
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
}));

export default useStyles;
