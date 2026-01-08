import { motion, Transition } from 'framer-motion';
import Banner, { getBannersLinks } from '@/components/banner';
import Footer from '@/components/footer';
import InfoBanner from '@/components/layout/components/info_banner';
import { useBanner } from '@/components/layout/contexts/banner';
import useStyles, { BANNER_HEIGHT } from '@/components/layout/styles';
import type { LayoutProps } from '@/components/layout/types';
import Nav from '@/components/nav';

const bannerLinks = getBannersLinks();

const transition: Transition = {
  duration: 1,
};

const Layout = (props: LayoutProps) => {
  const { classes, cx } = useStyles();
  const { children, className, contentWrapperClassName, rootClassName } = props;
  const { isBannerVisible, bannerHeight } = useBanner();

  return (
    <div className={cx(classes.mainRoot, { bannerClosed: !isBannerVisible })}>
      <div className={classes.bannerWrapper}>
        <InfoBanner />
      </div>
      {isBannerVisible && (
        <div
          className={classes.bannerPlaceholder}
          style={{ height: bannerHeight || BANNER_HEIGHT }}
        />
      )}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className={cx(classes.root, rootClassName)}
      >
        <div className={cx(classes.contentWrapper, contentWrapperClassName)}>
          <Nav />
          <div className={classes.children}>
            <div className={classes.appBarPlaceholder} />
            {!!bannerLinks.length && <Banner />}
            <div className={cx(className, 'main-content')}>{children}</div>
          </div>
        </div>
        <Footer className={classes.footer} />
      </motion.div>
    </div>
  );
};

export default Layout;
