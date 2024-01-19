import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1),
    flexFlow: 'row nowrap',
    wordBreak: 'break-all',

    '&:hover': {
      cursor: 'pointer',
    },
  },
  short: {
    maxWidth: '16ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  avatar: {
    '&': {
      flex: `0 0 ${theme.spacing(3.5)}`,
    },
  },
  text: {
    '&': {
      flex: `1 1 auto`,
      color: theme.palette.custom.fonts.highlight,
    },
  },
  popper: {
    marginTop: `-${theme.spacing(2)} !important`,
  },
  tooltip: {
    maxWidth: 'none',
  },
}));

export default useStyles;
