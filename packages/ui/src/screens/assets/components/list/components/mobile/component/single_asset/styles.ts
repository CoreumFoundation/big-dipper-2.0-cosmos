import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  item: {
    marginBottom: theme.spacing(2),
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
      '&.popover': {
        display: 'flex',
        alignItems: 'flex-start',
      },
    },
    '& p.value': {
      color: theme.palette.custom.fonts.fontTwo,
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    '& .status': {
      '&.one': {
        color: theme.palette.custom.tags.one,
      },
      '&.two': {
        color: theme.palette.custom.tags.two,
      },
      '&.three': {
        color: theme.palette.custom.tags.three,
      },
      '&.zero': {
        color: theme.palette.custom.tags.zero,
      },
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > div': {
      width: '50%',
    },
  },
  nameBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  assetLogo: {
    marginRight: theme.spacing(1.5),
  },
  nameColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    color: theme.palette.text.primary,
    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    marginBottom: theme.spacing(0.25),
    textTransform: 'capitalize',
  },
  chainRow: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.custom.fonts.table_headers,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  nameChain: {
    color: theme.palette.custom.tags.six,
    background: alpha(theme.palette.text.secondary, 0.25),
    textTransform: 'capitalize',
    fontSize: theme.spacing(1.5),
    padding: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
    borderRadius: '2px',
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  priceChange: {
    marginLeft: theme.spacing(0.75),
    fontWeight: 400,

    '&.up': {
      color: theme.palette.primary.main,
    },
    '&.down': {
      color: '#FF9595',
    },
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
}));

export default useStyles;
