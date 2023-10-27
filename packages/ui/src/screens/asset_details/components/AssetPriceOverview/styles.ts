import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  assetOverviewRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  assetProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  assetName: {
    fontSize: theme.spacing(4),
    fontWeight: 600,
    lineHeight: theme.spacing(6),
    color: theme.palette.text.primary,
  },
  assetChain: {
    fontSize: theme.spacing(1.75),
    fontWeight: 400,
    color: '#5E6773',
    textTransform: 'uppercase',
  },
  assetDescription: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    lineHeight: theme.spacing(3),
    color: theme.palette.custom.tags.six,
  },
  divider: {
    // margin: theme.spacing(3, 0),
  },
  statusRoot: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  pricesRoot: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  priceDataRoot: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  priceItem: {
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      fontSize: theme.spacing(4),
      color: '#ffffff',
      fontWeight: 600,
      alignItems: 'center',
      display: 'flex',

      '& .currency': {
        fontSize: theme.spacing(1.5),
        fontWeight: 400,
        color: '#878787',
        marginLeft: theme.spacing(0.5),
      },
      '& .priceChange': {
        fontSize: theme.spacing(1.75),
        fontWeight: 400,
        marginLeft: theme.spacing(1),
        padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
        borderRadius: theme.spacing(0.5),

        '&.up': {
          color: theme.palette.primary.main,
          background: alpha(theme.palette.primary.main, 0.1),
        },
        '&.down': {
          color: '#FF9595',
          background: alpha('#FF9595', 0.1),
        },
      },
    },
  },
  statusItem: {
    '& .label': {
      fontSize: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      color: theme.palette.text.primary,
      fontWeight: 500,
      fontSize: theme.spacing(2),

      '&.good': {
        color: theme.palette.custom.condition.one,
      },
      '&.moderate': {
        color: theme.palette.custom.condition.two,
      },
      '&.bad': {
        color: theme.palette.custom.condition.three,
      },
      '&.condition': {
        color: theme.palette.custom.condition.zero,
      },
    },
  },
  pricesContainer: {
    display: 'grid',
    [theme.breakpoints.up('md')]: {
      borderRight: '1px solid #23272E',
    },
  },
  pricesColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  tokenTypeBlock: {
    display: 'flex',
  },
  tokenType: {
    fontSize: theme.spacing(1.75),
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    color: '#3379e2',
    background: alpha('#3379e2', 0.25),
    borderRadius: 2,
  },
  chain: {
    display: 'flex',
  },
  nameChain: {
    color: theme.palette.custom.tags.six,
    background: alpha(theme.palette.text.secondary, 0.25),
    textTransform: 'capitalize',
    fontSize: theme.spacing(1.75),
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    borderRadius: '2px',
  },
  chart: {},
}));

export default useStyles;
