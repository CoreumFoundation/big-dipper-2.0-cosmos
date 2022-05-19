import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          display: 'grid',
          gridGap: theme.spacing(1),
        },
        blockHeight: {
          background: theme.palette.custom.general.single_block,
        },
        blockTime: {
          background: theme.palette.custom.general.single_block,
        },
        price: {
          background: theme.palette.custom.general.single_block,
        },
        validators: {
          background: theme.palette.custom.general.single_block,
        },
      });
    }, { index: 1 },
  )();

  return styles;
};
