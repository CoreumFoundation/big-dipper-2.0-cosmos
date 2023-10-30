import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    overflow: 'auto',
  },
  header: {
    // ...theme.mixins.tableCell,
    background: theme.palette.custom.general.modal_header,
    color: theme.palette.custom.fonts.table_headers,
    textTransform: 'uppercase',
    fontSize: '12px !important',
  },
  table: {
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        whiteSpace: 'nowrap',
        height: 'auto',
      },
    },
  },
}));

export default useStyles;
