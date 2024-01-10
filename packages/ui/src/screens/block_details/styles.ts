import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(2),
    },
  },
  signatures: {
    height: '450px',
    [theme.breakpoints.up('lg')]: {
      height: '450px',
    },
  },
  block: {
    ...(theme.mixins.layout as CSSObject),
    paddingBottom: '0 !important',
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
