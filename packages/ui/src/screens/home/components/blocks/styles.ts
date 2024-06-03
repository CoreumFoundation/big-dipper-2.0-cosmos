import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),

    '& .button': {
      color: theme.palette.primary.main,
      fontSize: theme.spacing(1.75),

      '&:hover': {
        cursor: 'pointer',
      },
    },

    [theme.breakpoints.up('lg')]: {
      padding: `0 !important`,
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 1.5,

    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2),
    },
  },
  seeMoreFooter: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1.5,
  },
}));

export default useStyles;
