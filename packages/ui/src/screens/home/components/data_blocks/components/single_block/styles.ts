import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.primary.main,
    '& .label': {
      width: '50%',
      color: theme.palette.primary.contrastText,
      lineHeight: 1.5,
    },
    '& .content': {
      width: '50%',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'flex-end',
    },
    '& .description': {
      display: 'block',
      color: theme.palette.primary.contrastText,
      fontSize: theme.spacing(1.75),
      lineHeight: 1.5,
    },
    '& .value': {
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.spacing(2.5),
      marginBottom: 0,
      lineHeight: 1.5,
    },
  },
}));

export default useStyles;
