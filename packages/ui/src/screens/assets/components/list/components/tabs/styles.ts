import Color from 'color';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    '.MuiTabs-indicator': {
      display: 'none',
    },

    '.MuiTab-root': {
      background: Color('#1B1D23').alpha(0.5).toString(),
      color: '#6C6F78',
      fontWeight: 400,
      fontSize: theme.spacing(1.75),
      padding: `${theme.spacing(1.5)} ${theme.spacing(3.5)}`,

      '&:first-child': {
        borderTopLeftRadius: theme.spacing(0.5),
        borderBottomLeftRadius: theme.spacing(0.5),
      },

      '&:last-child': {
        borderTopRightRadius: theme.spacing(0.5),
        borderBottomRightRadius: theme.spacing(0.5),
      },

      '&.Mui-selected': {
        background: Color('#25D695').alpha(0.15).toString(),
        color: '#25D695',
        fontWeight: 600,
      },
    },
  },
}));

export default useStyles;
