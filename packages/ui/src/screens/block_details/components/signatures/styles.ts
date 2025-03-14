import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
      paddingBottom: theme.spacing(2),
    },
  },
  wrapper: {
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
