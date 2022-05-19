import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'auto',
        },
        label: {
          marginBottom: theme.spacing(2),
        },
      });
    }, { index: 1 },
  )();

  return styles;
};
