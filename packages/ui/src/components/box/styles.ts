import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '&&': {
      overflow: 'auto',
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.background.paper,
    },
  },
}));

export default useStyles;
