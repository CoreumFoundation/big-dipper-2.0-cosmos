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
  assetProfileLogo: {
    marginRight: theme.spacing(1.5),
  },
  assetLogo: {
    width: '40px',
    height: '40px',
    minHeight: '40px',
    minWidth: '40px',
  },
  assetProfileData: {
    display: 'flex',
    flexDirection: 'column',
  },
  assetName: {
    fontSize: theme.spacing(4),
    fontWeight: 600,
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'baseline',
  },
  chainRow: {
    color: theme.palette.custom.fonts.table_headers,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  nameChain: {
    color: theme.palette.custom.tags.six,
    background: alpha(theme.palette.text.secondary, 0.25),
    textTransform: 'capitalize',
    fontSize: theme.spacing(1.75),
    padding: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
    borderRadius: '2px',
    marginLeft: '10px',
  },
  // assetChain: {
  //   fontSize: theme.spacing(1.75),
  //   fontWeight: 400,
  //   color: theme.palette.custom.tags.six,
  //   background: alpha(theme.palette.text.secondary, 0.25),
  //   padding: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
  //   borderRadius: '2px',
  //   marginLeft: '10px',
  // },
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
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
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
      '&.links': {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          gap: theme.spacing(2),
          minWidth: '50%',
          marginRight: theme.spacing(6),
        },
        // [theme.breakpoints.up('lg')]: {
        //   display: 'grid',
        //   gridTemplateColumns: 'repeat(5, 1fr)',
        //   minWidth: 'auto',
        //   marginRight: 0,
        // },
      },
      '&.social-links': {
        display: 'flex',
        gap: theme.spacing(2),
      },
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  linkRow: {
    display: 'flex',
    alignItems: 'center',
  },
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(1.75),
    padding: theme.spacing(0.5, 1),
    background: alpha('#868991', 0.25),
    borderRadius: 2,
    minWidth: 'min-content',
  },
  linkIcon: {
    marginRight: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
  },
  socialMediaLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(1.75),
    gap: theme.spacing(2.25),
    padding: theme.spacing(0.5, 0),
  },
}));

export default useStyles;
