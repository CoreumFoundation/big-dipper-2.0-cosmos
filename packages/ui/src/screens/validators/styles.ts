import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  layoutRoot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(100vh - ${theme.spacing(8)})`,
    marginTop: theme.spacing(8),

    [theme.breakpoints.up('lg')]: {
      marginTop: 'unset',
      minHeight: '100vh',
    },
  },
  layoutContentWrapper: {
    marginBottom: theme.spacing(6),
    display: 'flex',
    flex: 1,
    maxHeight: `calc(100vh - ${theme.spacing(10)})`,

    [theme.breakpoints.up('lg')]: {
      maxHeight: 'unset',
    },
  },
}));

export default useStyles;
