import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          height: '100%',
          display: 'flex',
          alignItems: 'center',

          '& .MuiInputBase-root': {
            width: '100%',
            height: '100%',
            background: theme.palette.custom.general.search,
            padding: theme.spacing(1, 2),
            borderRadius: 48,
          },
          '& .MuiInputBase-input': {
            textOverflow: 'ellipsis',
            '&::placeholder': {
              color: theme.palette.custom.fonts.fontFour,
            },
          },
          '& .Search-icon': {
            background: theme.palette.primary.main,
            borderRadius: '100%',
            padding: 5,
            width: 30,
            height: 30,
            color: 'white',
          },
        },
      });
    },
  )();

  return styles;
};
