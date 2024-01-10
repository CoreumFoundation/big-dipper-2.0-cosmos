import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
  cell: {
    ...(theme.mixins.tableCell as CSSObject),
  },
  body: {
    color: theme.palette.custom.fonts.fontTwo,
  },
  cellItem: {
    width: 'auto',
  },
  headerCell: {
    color: theme.palette.custom.fonts.table_headers,
    textTransform: 'uppercase',
    backgroundColor: theme.palette.custom.general.modal_header,

    '& .MuiTypography-h4': {
      fontSize: `${theme.spacing(1.5)} !important`,
      fontWeight: 400,
    },
  },
}));

export default useStyles;
