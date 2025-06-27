import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  mainWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),

    '@media (max-width: 676px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  dexSettingsItem: {
    '& .label': {
      fontSize: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      color: theme.palette.text.primary,
      fontWeight: 500,
      fontSize: theme.spacing(2),

      '&.good': {
        color: theme.palette.custom.condition.one,
      },
      '&.moderate': {
        color: theme.palette.custom.condition.two,
      },
      '&.bad': {
        color: theme.palette.custom.condition.three,
      },
      '&.condition': {
        color: theme.palette.custom.condition.zero,
      },
    },
  },
  denomsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
}));

export default useStyles;
