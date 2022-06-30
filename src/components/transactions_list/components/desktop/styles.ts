import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          height: '100%',
        },
        cell: {
          ...theme.mixins.tableCell,
        },
        header: {
          ...theme.mixins.tableCell,
          background: theme.palette.custom.general.modal_header,
          color: theme.palette.custom.fonts.table_headers,
          textTransform: 'uppercase',
        },
        body: {
          color: theme.palette.custom.fonts.fontTwo,
        },
      });
    },
  )();

  return styles;
};
