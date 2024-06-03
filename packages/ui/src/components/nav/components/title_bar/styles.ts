import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'grid',
  },
  logo: {
    height: '56px',
  },
  content: {
    width: '100%',
    background: theme.palette.custom.general.surfaceOne,
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    display: 'grid',
    placeItems: 'center start',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    width: '100%',
    '& .label': {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1),
      fontSize: theme.spacing(1.75),
      fontWeight: 400,
      lineHeight: 1.5,
    },
    '& .data': {
      textAlign: 'right',
      fontSize: theme.spacing(2),
      fontWeight: 600,
      lineHeight: 1.5,
    },
    [theme.breakpoints.up('lg')]: {
      padding: 0,
    },
  },
}));

export default useStyles;
