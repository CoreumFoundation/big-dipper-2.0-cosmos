import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gap: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(2, 1fr) 500px',
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
    color: theme.palette.primary.main,
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
