import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    h2: {
      color: theme.palette.primary.main,
    },
  },
  header: {
    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
      fontWeight: 600,
    },
  },
  body: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: 16,

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(6, 1fr)',
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
      fontWeight: 400,
    },
    '& .detail': {
      color: theme.palette.text.primary,
      fontSize: theme.spacing(2),
      fontWeight: 600,
      lineHeight: '24px',
      wordBreak: 'break-all',
    },
  },
}));

export default useStyles;
