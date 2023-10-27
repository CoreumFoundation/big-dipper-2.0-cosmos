import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

interface AssetTradingChartProps {
  data: any[];
}

export const AssetTradingChart = ({ data }: AssetTradingChartProps) => {
  const { backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor } = {
    backgroundColor: 'transparent',
    lineColor: '#2962FF',
    textColor: '#5E6773',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
  };

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: (chartContainerRef.current as any).clientWidth,
        crosshair: {
          vertLine: {
            visible: false,
          },
          horzLine: {
            color: '#6A5ACD',
            style: 1,
            visible: true,
            labelVisible: true,
          },
          mode: CrosshairMode.Magnet,
        },
      });
    };

    const chart = createChart(chartContainerRef.current as any, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: (chartContainerRef.current as any).clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
    });
    chart.timeScale().fitContent();

    const baselineSeries = chart.addBaselineSeries({
      baseValue: { type: 'price', price: 25 },
      topLineColor: '#25D695',
      topFillColor1: 'rgba( 38, 166, 154, 0.28)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: '#FF9595',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
    });
    baselineSeries.setData(data);
    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  return <div ref={chartContainerRef as any} />;
};
