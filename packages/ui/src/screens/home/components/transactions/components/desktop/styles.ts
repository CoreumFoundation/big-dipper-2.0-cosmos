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
      '& .MuiTableHead-root': {
        '& .MuiTableCell-root': {
          fontSize: theme.spacing(1.5),
        },
      },

      '& .MuiTableCell-root': {
        whiteSpace: 'nowrap',
        height: 'auto',
        lineHeight: 1.5,
        fontSize: theme.spacing(1.75),
      },
    },
  },
}));

export default useStyles;
