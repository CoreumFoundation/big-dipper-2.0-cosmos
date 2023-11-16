import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  box: {
    // marginTop: theme.spacing(10),
    height: '100%',
    minHeight: '65vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down(401)]: {
      '& > h1': {
        fontSize: '1.75rem',
      },
      '& > h4': {
        fontSize: '0.75rem',
      },
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
