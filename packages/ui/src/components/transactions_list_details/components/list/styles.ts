import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    background: theme.palette.custom.general.background,
  },
  listItem: {
    marginTop: 0,
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
  },
}));

export default useStyles;
