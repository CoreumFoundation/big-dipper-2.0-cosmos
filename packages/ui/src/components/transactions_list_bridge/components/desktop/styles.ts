import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    '&:-webkit-scrollbar': {
      display: 'block',
    },
  },
  cell: {
    ...(theme.mixins.tableCell as CSSObject),
    padding: theme.spacing(2),
    overflow: 'auto',
    scrollbarWidth: 'none',
  },
  header: {
    ...(theme.mixins.tableCell as CSSObject),
    background: theme.palette.custom.general.modal_header,
    color: theme.palette.custom.fonts.table_headers,
    textTransform: 'uppercase',

    h4: {
      fontSize: '12px !important',
    },
  },
  body: {
    color: theme.palette.custom.fonts.fontTwo,
    '& .copy-icon': {
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      cursor: 'pointer',
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  combined: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing(1),
  },
  sender: {
    display: 'flex',
    fontSize: theme.spacing(1.75),
    minWidth: '80px',
  },
  arrow: {
    display: 'flex',

    svg: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },
  receiver: {
    display: 'flex',
    fontSize: theme.spacing(1.75),
  },
  amount: {
    fontSize: theme.spacing(2),
  },
  decimal: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.secondary,
  },
  denom: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(1.75),
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
    width: '100%',
  },
  formatDate: {
    display: 'flex',
    columnGap: theme.spacing(0.5),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.5),
  },
  tagType: {
    '& p': {
      fontSize: theme.spacing(1.75),
    },
  },
  route: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  arrows: {
    transform: 'rotate(-90deg)',
  },
}));

export default useStyles;
