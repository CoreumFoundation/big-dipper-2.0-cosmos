import {
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          overflow: 'auto',
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
