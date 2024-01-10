import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    overflow: 'hidden',
    h2: {
      color: theme.palette.primary.main,
    },
  },
  header: {},
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
  },
  bodyFull: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    margin: theme.spacing(2, 0),
  },
  bodyFlex: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: 16,

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    '&:last-child': {
      paddingBottom: 0,
    },
    '& .label': {
      marginBottom: theme.spacing(0.5),
      fontSize: theme.spacing(1.75),
      color: theme.palette.text.secondary,
    },
    '& .detail': {
      color: theme.palette.text.primary,
      fontSize: theme.spacing(1.75),
      fontWeight: 500,
      lineHeight: '24px',
      wordBreak: 'break-all',
    },
  },
}));

export default useStyles;
