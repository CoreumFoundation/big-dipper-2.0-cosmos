import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';
import { BANNER_HEIGHT } from '@/components/layout/styles';

type StyleProps = {
  isBannerOpen: boolean;
  bannerHeight: number;
};

const useStyles = makeStyles<StyleProps>()((theme, { isBannerOpen, bannerHeight }) => {
  const OPEN_DRAWER_WIDTH = 200;
  const CLOSED_DRAWER_WIDTH = 77;
  const effectiveBannerHeight = bannerHeight || BANNER_HEIGHT;
  const bannerOffset = isBannerOpen ? effectiveBannerHeight : 0;

  return {
    root: {
      '& .MuiDrawer-paperAnchorDockedLeft': {
        border: 'none',
      },
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      width: '216px',
      height: 70,
      padding: theme.spacing(2.5),
      paddingLeft: theme.spacing(3.5),
      '&:hover': {
        cursor: 'pointer',
      },
    },
    logo_text: {
      display: 'grid',
    },
    arrowIcon: {
      position: 'fixed',
      zIndex: 1201,
      cursor: 'pointer',
      fill: 'none',
      top: 24 + bannerOffset,
      left: 65,
      transform: 'rotate(180deg)',
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '&.collapse': {
        left: 188,
        transform: 'rotate(0deg)',
      },
    },

    appBar: {
      '&&': {
        ...(theme.mixins.toolbar as CSSObject),
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        background: theme?.palette?.background?.default,
        color: theme?.palette?.custom?.fonts?.fontTwo ?? 'inherit',
        width: `calc(100% - ${CLOSED_DRAWER_WIDTH}px)`,
        top: bannerOffset,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin', 'top'], {
          easing: theme.transitions.easing.easeIn,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '&.MuiPaper-elevation4': {
          boxShadow: 'none',
        },
        '&.open': {
          marginLeft: OPEN_DRAWER_WIDTH,
          width: `calc(100% - ${OPEN_DRAWER_WIDTH}px)`,
          transition: theme.transitions.create(['width', 'margin', 'top'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    },
    drawer: {
      width: OPEN_DRAWER_WIDTH,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      paddingLeft: theme.spacing(2),
      boxSizing: 'border-box',
    },
    drawerOpen: {
      background: theme.palette.custom.general.nav_drawer,
      width: OPEN_DRAWER_WIDTH,
      overflowX: 'hidden',
      marginTop: bannerOffset,
      height: `calc(100% - ${bannerOffset}px)`,
      transition: theme.transitions.create(['width', 'margin-top', 'height'], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      background: theme.palette.custom.general.nav_drawer,
      transition: theme.transitions.create(['width', 'margin-top', 'height'], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
      width: CLOSED_DRAWER_WIDTH,
      marginTop: bannerOffset,
      height: `calc(100% - ${bannerOffset}px)`,
    },
  };
});

export default useStyles;
