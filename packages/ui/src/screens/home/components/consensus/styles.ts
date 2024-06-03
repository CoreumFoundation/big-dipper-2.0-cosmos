import { makeStyles } from 'tss-react/mui';
import Color from 'color';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    overflow: 'auto',

    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
    },
  },
  content: {
    placeSelf: 'start center',
  },
  chart: {
    '& .recharts-radial-bar-background-sector': {
      fill: Color(theme.palette.primary.main).alpha(0.4).toString(),
    },
  },
  chartPercentLabel: {
    fontSize: '2rem',
    fill: theme.palette.custom.fonts.fontOne,
  },
  chartExtraLabel: {
    fill: theme.palette.custom.fonts.fontTwo,
  },
  chartLabel: {
    fontSize: '1rem',
    color: theme.palette.custom.fonts.fontOne,
  },
  info: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    overflow: 'hidden',
    width: '100%',
    color: theme.palette.custom.fonts.fontTwo,

    '& .label': {
      fontSize: theme.spacing(1.75),
      fontWeight: 400,
      color: theme.palette.custom.fonts.fontThree,
      lineHeight: 1.5,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
    },
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
}));

export default useStyles;
