import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(1025)]: {
      height: 'auto',
      padding: theme.spacing(2, 1.5),
    },
    '& .MuiInputBase-root': {
      width: '100%',
      height: '100%',
      background: theme.palette.custom.general.search,
      paddingLeft: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      borderRadius: 48,
    },
    '& .MuiInputBase-input': {
      textOverflow: 'ellipsis',
      fontSize: theme.spacing(1.75),
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      lineHeight: theme.spacing(2.5),

      '&::placeholder': {
        color: theme.palette.custom.fonts.fontFour,
      },
    },
    '& .Search-icon': {
      width: 24,
      height: 24,
      color: 'white',
      cursor: 'pointer',
    },
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: 20,
    cursor: 'pointer',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
}));

export default useStyles;
