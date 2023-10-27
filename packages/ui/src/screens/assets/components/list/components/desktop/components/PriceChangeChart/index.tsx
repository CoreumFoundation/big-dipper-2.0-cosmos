import { FC } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface PriceChangeChartProps {
  predefinedColor: string;
  data: any[];
  id: string;
}

export const PriceChangeChart: FC<PriceChangeChartProps> = ({
  predefinedColor,
  data,
  id,
}: PriceChangeChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={200}
      height={60}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={predefinedColor} stopOpacity={0.8} />
          <stop offset="95%" stopColor={predefinedColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area dataKey="price" stroke={predefinedColor} fillOpacity={1} fill={`url(#${id})`} />
    </AreaChart>
  </ResponsiveContainer>
);
