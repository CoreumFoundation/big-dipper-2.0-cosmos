import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(2),
    maxWidth: '100%',
    overflow: 'auto',
    wordBreak: 'break-word',

    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      color: theme.palette.custom.fonts.fontTwo,
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    '& > div': {
      width: '50%',
    },
    gap: theme.spacing(2),
  },
}));

export default useStyles;
