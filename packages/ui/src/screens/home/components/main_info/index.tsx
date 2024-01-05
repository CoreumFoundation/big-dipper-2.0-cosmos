import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Box from '@/components/box';
import { TitleBar } from '@/components/nav/components';
import { Typography, Divider } from '@mui/material';
import { useScreenSize } from '@/hooks/use_screen_size';
import { useRecoilValue } from 'recoil';
import { readMarket } from '@/recoil/market';
import Big from 'big.js';
import { formatNumber } from '@/utils/format_token';
import useStyles from './styles';

const PriceChart = dynamic(() => import('./price_chart'), { ssr: false });

const MainInfo: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { classes, cx } = useStyles();
  const { isMobile } = useScreenSize();
  const marketState = useRecoilValue(readMarket);

  const renderPriceChange = useMemo(() => {
    const inflation = `${formatNumber(Big(marketState.inflation)?.times(100).toPrecision(), 2)}%`;

    if (marketState.inflation === 0) {
      return <span className={classes.priceChange}>{inflation}</span>;
    }

    if (marketState.inflation > 0) {
      return <span className={cx(classes.priceChange, classes.priceUp)}>+{inflation}</span>;
    }

    return <span className={cx(classes.priceChange, classes.priceDown)}>-{inflation}</span>;
  }, [marketState.inflation, classes.priceChange, classes.priceUp, classes.priceDown]);

  return (
    <Box className={cx(classes.root, className)}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h2" className={classes.label}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6156_3333)">
                <rect width="24" height="24" rx="12" fill="#25D695" />
                <path
                  d="M11.9981 10.0801C11.6184 10.0801 11.2472 10.1927 10.9314 10.4037C10.6157 10.6146 10.3696 10.9145 10.2243 11.2653C10.079 11.6162 10.0409 12.0022 10.115 12.3747C10.1891 12.7471 10.372 13.0892 10.6405 13.3577C10.909 13.6262 11.2511 13.8091 11.6236 13.8832C11.996 13.9573 12.382 13.9192 12.7329 13.7739C13.0837 13.6286 13.3836 13.3825 13.5945 13.0668C13.8055 12.751 13.9181 12.3798 13.9181 12.0001C13.9181 11.4909 13.7158 11.0025 13.3558 10.6424C12.9957 10.2824 12.5073 10.0801 11.9981 10.0801Z"
                  fill="white"
                />
                <path
                  d="M11.9991 4.32007C10.9903 4.31883 9.99128 4.5169 9.05931 4.9029C8.12734 5.2889 7.28082 5.85523 6.56836 6.56935L9.28516 9.28615C9.82204 8.74873 10.5063 8.38262 11.2512 8.23414C11.9962 8.08566 12.7685 8.16148 13.4704 8.45201C14.1723 8.74253 14.7723 9.23471 15.1944 9.86628C15.6165 10.4978 15.8418 11.2404 15.8418 12.0001C15.8418 12.7597 15.6165 13.5023 15.1944 14.1339C14.7723 14.7654 14.1723 15.2576 13.4704 15.5481C12.7685 15.8387 11.9962 15.9145 11.2512 15.766C10.5063 15.6175 9.82204 15.2514 9.28516 14.714L6.56836 17.4308C7.46143 18.3238 8.56096 18.9828 9.76955 19.3494C10.9781 19.716 12.2585 19.7789 13.4972 19.5325C14.7359 19.2861 15.8947 18.738 16.871 17.9368C17.8472 17.1356 18.6109 16.1059 19.0942 14.9391C19.5775 13.7723 19.7656 12.5043 19.6418 11.2474C19.5181 9.99052 19.0862 8.78356 18.3846 7.73343C17.6829 6.6833 16.7331 5.82241 15.6193 5.22702C14.5055 4.63163 13.262 4.32012 11.9991 4.32007Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_6156_3333">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Coreum
          </Typography>
          <Typography variant="h2" className={classes.price}>
            ${marketState.price}
            {renderPriceChange}
          </Typography>
        </div>
        <PriceChart />
      </div>
      <Divider
        orientation={isMobile ? 'horizontal' : 'vertical'}
        className={isMobile ? undefined : classes.divider}
      />
      <TitleBar marketState={marketState} />
    </Box>
  );
};

export default MainInfo;
