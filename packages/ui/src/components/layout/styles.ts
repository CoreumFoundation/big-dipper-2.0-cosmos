import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

// Default banner height fallback. The actual value is measured at runtime
// and provided via the BannerContext, but we keep this for SSR / initial render.
export const BANNER_HEIGHT = 67;

const useStyles = makeStyles()((theme) => ({
  mainRoot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  root: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
  },
  contentWrapper: {
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flex: 1,
    },
  },
  footer: {
    position: 'relative',
  },
  appBarPlaceholder: {
    ...(theme.mixins.toolbar as CSSObject),
  },
  children: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& .main-content': {
      width: '100%',
      flex: 1,
    },
  },
  bannerWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1300,
  },
  bannerPlaceholder: {
    height: BANNER_HEIGHT,
    flex: 'none',
  },
}));

export default useStyles;
