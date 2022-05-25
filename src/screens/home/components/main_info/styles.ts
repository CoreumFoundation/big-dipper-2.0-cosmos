import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '2fr auto 1fr',
          gap: 16,
        },
        label: {
          marginBottom: theme.spacing(2),
        },
        chart: {
          display: 'grid',
          placeItems: 'stretch',
        },
        container: {
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
        divider: {
          height: '90%',
          placeSelf: 'end',
        },
      });
    }, { index: 1 },
  )();

  return styles;
};
