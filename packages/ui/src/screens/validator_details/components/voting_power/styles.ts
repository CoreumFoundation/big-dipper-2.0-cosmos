import { makeStyles } from 'tss-react/mui';
import Color from 'color';

const useStyles = makeStyles<{ percentage: number }>()((theme, { percentage }) => ({
  root: {
    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
    },
  },
  data: {
    display: 'flex',
    alignItems: 'flex-end',
    '& .primary__data': {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(2),
      fontSize: '2.5rem',
    },
  },
  chart: {
    display: 'flex',
    height: '8px',
    borderRadius: theme.shape.borderRadius,
    background: Color(theme.palette.primary.main).alpha(0.2).string(),
    overflow: 'hidden',
    margin: theme.spacing(2, 0),
  },
  active: {
    width: `${percentage}%`,
    background: theme.palette.primary.main,
    transition: '0.3s',
  },
  rowItems: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',

    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      color: theme.palette.custom.fonts.fontTwo,
      '& .positive': {
        color: theme.palette.custom.tags.one,
      },
      '& .negative': {
        color: theme.palette.custom.tags.three,
      },
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}));

export default useStyles;
