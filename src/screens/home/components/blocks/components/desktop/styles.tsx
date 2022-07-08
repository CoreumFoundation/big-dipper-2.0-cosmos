import {
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          overflow: 'auto',
          '& a': {
            color: theme.palette.custom.fonts.highlight,
          },
        },
        header: {
          // ...theme.mixins.tableCell,
          background: theme.palette.custom.general.modal_header,
          color: theme.palette.custom.fonts.table_headers,
          textTransform: 'uppercase',
        },
        table: {
          '& .MuiTableBody-root': {
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
            },
          },
        },

      });
    },
  )();

  return styles;
};
