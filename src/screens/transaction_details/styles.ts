import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          ...theme.mixins.layout,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gridTemplateColumns: '1fr',
          gridGap: theme.spacing(1),
          '& a': {
            color: theme.palette.custom.fonts.highlight,
          },
          [theme.breakpoints.up('lg')]: {
            gridGap: theme.spacing(2),
          },
        },
        top: {
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme.spacing(2),
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: '1fr 1fr',
          },
        },
        messages: {
          minHeight: '500px',
          height: '50vh',
          [theme.breakpoints.up('lg')]: {
            minHeight: '650px',
            height: '40vh',
          },
        },
      });
    },
  )();

  return styles;
};
