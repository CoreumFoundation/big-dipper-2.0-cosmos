import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
  cell: {
    ...(theme.mixins.tableCell as CSSObject),
    padding: theme.spacing(2.5),
  },
  header: {
    ...(theme.mixins.tableCell as CSSObject),
    background: theme.palette.custom.general.modal_header,
    color: theme.palette.custom.fonts.table_headers,
    textTransform: 'uppercase',
  },
  body: {
    color: theme.palette.custom.fonts.fontTwo,
  },
  cellText: {
    fontSize: '14px !important',
  },
  avatar: {
    svg: {
      width: '22px !important',
      height: '22px !important',
      borderRadius: '50%',
    },
  },
}));

export default useStyles;
