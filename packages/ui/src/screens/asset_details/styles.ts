import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gap: theme.spacing(1),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
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
}));

export default useStyles;
