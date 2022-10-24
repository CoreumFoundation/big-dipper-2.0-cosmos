import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          ...theme.mixins.layout,
          '& a': {
            color: theme.palette.custom.fonts.highlight,
          },
        },
        box: {
          minHeight: '500px',
          height: '50vh',
          padding: `0px 0px ${theme.spacing(4)}px 0px !important`,
          [theme.breakpoints.up('lg')]: {
            height: '100%',
            minHeight: '65vh',
          },
        },
        header: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      });
    },
  )();

  return styles;
};
