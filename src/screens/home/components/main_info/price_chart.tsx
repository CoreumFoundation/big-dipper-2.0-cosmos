import { readTheme } from '@src/recoil/settings';
import {
  createChart, SingleValueData,
} from 'lightweight-charts';
import React, {
  useEffect, useRef,
} from 'react';
import { useRecoilValue } from 'recoil';

// import useTranslation from 'next-translate/useTranslation';
import { useStyles } from './styles';

const TitleBar:React.FC = () => {
  // const theme = useRecoilValue(readTheme);
  // const { t } = useTranslation('common');
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const theme = useRecoilValue(readTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const chartOptions: any = {
        layout: {
          textColor: theme === 'dark' ? 'white' : 'black',
          background: {
            type: 'solid', color: theme === 'dark' ? '#1B1D23' : 'white',
          },
        },
        grid: {
          vertLines: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
          horzLines: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
        },
      };
      const chart = createChart(document.getElementById('price-chart'), chartOptions);
      const baselineSeries = chart.addBaselineSeries({
        baseValue: {
          type: 'price', price: 25,
        },
        topLineColor: 'rgba( 38, 166, 154, 1)',
        topFillColor1: 'rgba( 38, 166, 154, 0.28)',
        topFillColor2: 'rgba( 38, 166, 154, 0.05)',
        bottomLineColor: 'rgba( 239, 83, 80, 1)',
        bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
      });

      const data = [{
        value: 1, time: 1642425322,
      }, {
        value: 8, time: 1642511722,
      }, {
        value: 10, time: 1642598122,
      }, {
        value: 20, time: 1642684522,
      }, {
        value: 3, time: 1642770922,
      }, {
        value: 43, time: 1642857322,
      }, {
        value: 41, time: 1642943722,
      }, {
        value: 43, time: 1643030122,
      }, {
        value: 56, time: 1643116522,
      }, {
        value: 46, time: 1643202922,
      }] as SingleValueData[];

      baselineSeries.setData(data);

      chart.timeScale().fitContent();
    }
  }, []);

  return (
    <div className={classes.chart} ref={ref} id="price-chart" />
  );
};

export default TitleBar;
