import { readTheme } from '@src/recoil/settings';
import {
  createChart, IChartApi, SingleValueData,
} from 'lightweight-charts';
import React, {
  useEffect, useRef,
} from 'react';
import { useRecoilValue } from 'recoil';

// import useTranslation from 'next-translate/useTranslation';
import { useStyles } from './styles';

const TitleBar: React.FC = () => {
  const classes = useStyles();
  const chartRef = useRef<IChartApi>(null);
  const theme = useRecoilValue(readTheme);

  useEffect(() => {
    if (typeof window !== 'undefined' && !chartRef.current) {
      const chartOptions = {
        layout: {
          textColor: theme === 'dark' ? 'white' : 'black',
          background: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
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
      chartRef.current = createChart(
        document.getElementById('price-chart'),
        chartOptions,
      );
      const baselineSeries = chartRef.current.addBaselineSeries({
        baseValue: {
          type: 'price',
          price: 25,
        },
        topLineColor: 'rgba( 38, 166, 154, 1)',
        topFillColor1: 'rgba( 38, 166, 154, 0.28)',
        topFillColor2: 'rgba( 38, 166, 154, 0.05)',
        bottomLineColor: 'rgba( 239, 83, 80, 1)',
        bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
      });

      const data = [
        {
          value: 1,
          time: 1642425322,
        },
        {
          value: 8,
          time: 1642511722,
        },
        {
          value: 10,
          time: 1642598122,
        },
        {
          value: 20,
          time: 1642684522,
        },
        {
          value: 3,
          time: 1642770922,
        },
        {
          value: 43,
          time: 1642857322,
        },
        {
          value: 41,
          time: 1642943722,
        },
        {
          value: 43,
          time: 1643030122,
        },
        {
          value: 56,
          time: 1643116522,
        },
        {
          value: 46,
          time: 1643202922,
        },
      ] as SingleValueData[];

      baselineSeries.setData(data);

      chartRef.current.timeScale().fitContent();
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        layout: {
          textColor: theme === 'dark' ? 'white' : 'black',
          background: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
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
      });
    }
  }, [theme]);

  useEffect(() => {
    const handle = () => {
      if (chartRef.current) {
        const container = document.getElementById('price-chart');
        const dimensions = {
          width: container.clientWidth, height: container.clientHeight,
        };
        chartRef.current.applyOptions(dimensions);
        // chartRef.current.timeScale().fitContent();
      }
    };
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('resize', handle);
    };
  }, []);

  return <div className={classes.chart} id="price-chart" />;
};

export default TitleBar;
