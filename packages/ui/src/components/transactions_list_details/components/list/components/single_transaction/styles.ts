import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
  },
  timeContainer: {
    background: theme.palette.custom.general.surfaceTwo,
    padding: theme.spacing(1, 2),
    color: theme.palette.custom.fonts.fontTwo,
  },
  itemContainer: {
    padding: theme.spacing(2, 2, 1),
  },
  itemPrimaryDetailsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  item: {
    gridColumn: '1/3',
    marginBottom: theme.spacing(2),
    '&.messages, &.result': {
      gridColumn: 'auto / span 1',
    },
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
    [theme.breakpoints.up('md')]: {
      '&.block, &.time': {
        gridColumn: 'auto / span 1',
      },
    },
    [theme.breakpoints.up('md')]: {
      gridColumn: 'auto / span 1',
    },
  },
  msgListContainer: {
    marginTop: theme.spacing(3),
  },
  msg: {
    wordBreak: 'break-all',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(4),
    },
  },
  tags: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
