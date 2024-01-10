import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .memo': {
      alignItems: 'flex-start',
      '& .label': {
        marginRight: theme.spacing(5),
      },
    },

    '& .MuiTypography-h2': {
      color: `${theme.palette.custom.fonts.fontFive} !important`,
      fontSize: theme.spacing(2.5),
    },
  },
}));

export default useStyles;
