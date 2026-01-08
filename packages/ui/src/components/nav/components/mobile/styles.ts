import { makeStyles } from 'tss-react/mui';
import { BANNER_HEIGHT } from '@/components/layout/styles';

type StyleProps = {
  isBannerOpen: boolean;
  bannerHeight: number;
};

const useStyles = makeStyles<StyleProps>()((theme, { isBannerOpen, bannerHeight }) => {
  const effectiveBannerHeight = bannerHeight || BANNER_HEIGHT;
  const bannerOffset = isBannerOpen ? effectiveBannerHeight : 0;

  return {
    root: {
      zIndex: 500,
      width: '100%',
      position: 'fixed',
      top: bannerOffset,
      background: theme.palette.background.default,
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    screens: {
      opacity: 0,
      background: theme.palette.background.paper,
      visibility: 'hidden',
      transition: '0.2s ease-in-out',
      position: 'fixed',
      width: '100%',
      paddingTop: '3.5rem',
      height: '100vh',
      '&.open': {
        opacity: 1,
        visibility: 'visible',
        overflow: 'auto',
      },
      '&.menu': {
        zIndex: 151,
      },
      '&.network': {
        zIndex: 1,
      },
    },
    searchBar: {
      padding: theme.spacing(2),
    },
    networks: {
      padding: theme.spacing(2),
      height: '100%',
      overflow: 'auto',
    },
  };
});

export default useStyles;
