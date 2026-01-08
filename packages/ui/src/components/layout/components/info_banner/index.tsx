'use client';

import { FC, useEffect, useRef } from 'react';
import { useBanner } from '@/components/layout/contexts/banner';
import useStyles from './styles';

export type BannerType =
  | 'upgrade_complete'
  | 'proposal_passed'
  | 'voting_started'
  | 'new_proposal'
  | 'none';

export const getBannerType = (): BannerType =>
  (process.env.NEXT_PUBLIC_BANNER_TYPE as BannerType) || 'none';

export const hasBannerContent = (): boolean => getBannerType() !== 'none';

interface BannerContent {
  title: string;
  description: React.ReactNode;
}

const getBannerContent = (type: BannerType): BannerContent | null => {
  switch (type) {
    case 'upgrade_complete':
      return {
        title: 'Upgrade Complete: Coreum is now TX',
        description: (
          <>
            The network migration has been successfully executed. Head to{' '}
            <a href="https://tx.org" target="_blank" rel="noopener noreferrer">
              tx.org
            </a>{' '}
            to access the new ecosystem of RWA products running on the Coreum blockchain legacy.
          </>
        ),
      };
    case 'proposal_passed':
      return {
        title: 'Update: The proposal for Coreum to join TX has passed!',
        description: (
          <>
            The network migration will take effect at{' '}
            <span className="highlight">00:00:00 EST</span> on{' '}
            <span className="highlight">February 14</span>. Learn more about the details{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </>
        ),
      };
    case 'voting_started':
      return {
        title: 'Update: Voting has officially started for Coreum to join TX',
        description: (
          <>
            Read the full proposal and cast your vote by{' '}
            <span className="highlight">February 8</span>{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </>
        ),
      };
    case 'new_proposal':
      return {
        title: 'New Proposal: Coreum to Become TX',
        description: (
          <>
            A unified ecosystem, infrastructure, and marketplace for real-world assets, supported by
            globally regulated partners. Voting starts <span className="highlight">February 2</span>
            . Learn more at{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              tx.org
            </a>
            .
          </>
        ),
      };
    case 'none':
    default:
      return null;
  }
};

const InfoBanner: FC = () => {
  const { isBannerOpen, closeBanner, setBannerHeight } = useBanner();
  const { classes } = useStyles();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const bannerType = getBannerType();
  const content = getBannerContent(bannerType);

  useEffect(() => {
    if (!isBannerOpen || !content || !wrapperRef.current) {
      return;
    }

    const updateHeight = () => {
      if (wrapperRef.current) {
        const { height } = wrapperRef.current.getBoundingClientRect();
        setBannerHeight(height);
      }
    };

    // Initial measurement
    updateHeight();

    // Observe resize changes
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(wrapperRef.current);

    // Also listen to window resize as a fallback
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [isBannerOpen, content, setBannerHeight]);

  if (!isBannerOpen || !content) {
    return null;
  }

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <div className={classes.container}>
        <p className={classes.title}>{content.title}</p>
        <p className={classes.description}>{content.description}</p>
        <button
          type="button"
          className={classes.closeButton}
          onClick={closeBanner}
          aria-label="Close banner"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.15502 6.27981C5.17872 6.25612 5.19203 6.22398 5.19203 6.19048C5.19203 6.15697 5.17872 6.12484 5.15502 6.10114L0.195948 1.14207C-0.0653159 0.880804 -0.0653159 0.457211 0.195948 0.195948C0.457211 -0.0653159 0.880804 -0.0653159 1.14207 0.195948L6.10114 5.15502C6.15048 5.20436 6.23047 5.20436 6.27981 5.15502L11.2387 0.196142C11.5 -0.0651231 11.9235 -0.0651225 12.1848 0.196142C12.4461 0.457405 12.4461 0.880997 12.1848 1.14226L7.22593 6.10114C7.17659 6.15048 7.17659 6.23047 7.22593 6.27981L12.1848 11.2387C12.4461 11.5 12.4461 11.9235 12.1848 12.1848C11.9235 12.4461 11.5 12.4461 11.2387 12.1848L6.27981 7.22593C6.23047 7.17659 6.15048 7.17659 6.10114 7.22593L1.14207 12.185C0.880804 12.4463 0.457211 12.4463 0.195948 12.185C-0.0653159 11.9237 -0.0653159 11.5001 0.195948 11.2389L5.15502 6.27981Z"
              fill="#D2D2D2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InfoBanner;
