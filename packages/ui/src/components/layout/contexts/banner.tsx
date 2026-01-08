import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

// Check if banner has content based on env var
const hasBannerContent = (): boolean => {
  const bannerType = process.env.NEXT_PUBLIC_BANNER_TYPE || 'none';
  return bannerType !== 'none';
};

interface BannerContextType {
  isBannerOpen: boolean;
  isBannerVisible: boolean;
  isHydrated: boolean;
  bannerHeight: number;
  closeBanner: () => void;
  openBanner: () => void;
  setBannerHeight: (height: number) => void;
}

const BannerContext = createContext<BannerContextType>({
  isBannerOpen: true,
  isBannerVisible: false,
  isHydrated: false,
  bannerHeight: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeBanner: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openBanner: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBannerHeight: () => {},
});

export const useBanner = () => useContext(BannerContext);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const hasContent = hasBannerContent();

  useEffect(() => {
    setIsBannerOpen(true);
    setIsHydrated(true);
  }, []);

  const closeBanner = () => {
    setIsBannerOpen(false);
  };

  const openBanner = () => {
    setIsBannerOpen(true);
  };

  const isBannerVisible = hasContent && isBannerOpen && isHydrated;

  const value = useMemo(
    () => ({
      isBannerOpen,
      isBannerVisible,
      isHydrated,
      bannerHeight,
      closeBanner,
      openBanner,
      setBannerHeight,
    }),
    [isBannerOpen, isBannerVisible, isHydrated, bannerHeight]
  );

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
};

export default BannerContext;
