import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  list: {
    margin: theme.spacing(2, 0),
  },
  item: {
    marginBottom: theme.spacing(2),
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      color: theme.palette.custom.fonts.fontTwo,
      '&.unknown': {
        color: theme.palette.custom.condition.zero,
      },
      '&.unbonded': {
        color: theme.palette.custom.condition.zero,
      },
      '&.active': {
        color: theme.palette.custom.condition.one,
      },
      '&.jailed': {
        color: theme.palette.custom.condition.two,
      },
      '&.unbonding': {
        color: theme.palette.custom.condition.three,
      },
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
}));

export default useStyles;
