import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0 !important`,

    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    '& .button': {
      color: theme.palette.primary.main,
      fontSize: theme.spacing(1.75),

      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),

    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
    },
  },
  seeMoreFooter: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
