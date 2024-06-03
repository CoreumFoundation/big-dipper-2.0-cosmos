import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    overflow: 'auto',
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  header: {
    // ...theme.mixins.tableCell,
    background: theme.palette.custom.general.modal_header,
    color: `${theme.palette.custom.fonts.table_headers} !important`,
    textTransform: 'uppercase',
    fontSize: '12px !important',
  },
  table: {
    '& .MuiTableBody-root': {
      overflow: 'hidden',

      '& .MuiTableHead-root': {
        '& .MuiTableCell-root': {
          fontSize: theme.spacing(1.5),
        },
      },

      '& .MuiTableRow-root': {
        '& .MuiTableCell-root': {
          '&:last-child': {
            minWidth: 100,
          },
        },
      },
      '& .MuiTableCell-root': {
        whiteSpace: 'nowrap',
        height: 'auto',
        lineHeight: 1.5,
        fontSize: theme.spacing(1.75),

        '& .MuiTypography-body1': {
          whiteSpace: 'nowrap',
          height: 'auto',
        },
      },
    },
  },
}));

export default useStyles;
