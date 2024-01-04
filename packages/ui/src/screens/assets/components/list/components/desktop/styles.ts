import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
  cell: {
    ...(theme.mixins.tableCell as CSSObject),
    height: '78px !important',
    '&.sort:hover': {
      cursor: 'pointer',
    },
  },
  flexCells: {
    '& > *': {
      display: 'flex',
      alignItems: 'center',
    },
    '&.right': {
      '& > *': {
        justifyContent: 'flex-end',
      },
    },
    '&.center': {
      '& > *': {
        justifyContent: 'center',
      },
    },
  },
  header: {
    color: `${theme.palette.custom.fonts.table_headers} !important`,
    fontSize: '12px !important',
  },
  body: {
    color: theme.palette.custom.fonts.fontTwo,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  priceBlock: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(1.75),
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  priceChange: {
    marginLeft: theme.spacing(0.75),
    fontSize: theme.spacing(1.5),
    fontWeight: 400,

    '&.up': {
      color: theme.palette.primary.main,
    },
    '&.down': {
      color: '#FF9595',
    },
  },
  supply: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
  },
  marketCap: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
  },
  holders: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
  },
}));

export default useStyles;
