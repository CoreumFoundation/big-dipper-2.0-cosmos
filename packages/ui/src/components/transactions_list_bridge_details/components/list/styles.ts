import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
  listItem: {
    marginTop: 10,
    background: theme.palette.background.paper,
  },
}));

export default useStyles;
