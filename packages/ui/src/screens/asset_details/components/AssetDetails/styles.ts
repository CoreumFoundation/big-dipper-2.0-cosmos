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
  assetProfileLogo: {
    marginRight: theme.spacing(1.5),
  },
  assetLogo: {
    width: '40px',
    height: '40px',
    minHeight: '40px',
    minWidth: '40px',
  },
  assetProfileData: {},
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
    margin: theme.spacing(3, 0),
  },
  statusRoot: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  statusItem: {
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
      fontSize: theme.spacing(1.75),
      '&.condition': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    '& p.value': {
      fontSize: theme.spacing(2),
      color: theme.palette.custom.fonts.fontTwo,
      fontWeight: 500,
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
}));

export default useStyles;
