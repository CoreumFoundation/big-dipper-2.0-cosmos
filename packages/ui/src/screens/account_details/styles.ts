import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(2),
      // gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  balance: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  otherTokens: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  overview: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  staking: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  transactions: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  block: {
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: theme.spacing(1.75),
    fontWeight: 500,
    color: `${theme.palette.primary.main} !important`,
    '& svg': {
      fill: 'transparent',
    },
  },
  title: {
    fontSize: theme.spacing(3.5),
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

export default useStyles;
