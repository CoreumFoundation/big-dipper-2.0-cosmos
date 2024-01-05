import chainConfig from '@/chainConfig';
import Box from '@/components/box';
import CustomToolTip, { type CustomToolTipData } from '@/components/custom_tool_tip';
import { useTokenomics } from '@/screens/home/components/tokenomics/hooks';
import useStyles from '@/screens/home/components/tokenomics/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import numeral from 'numeral';
import { FC } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const DynamicPieChart = dynamic(() => Promise.resolve(PieChart), { ssr: false });
const { tokenUnits } = chainConfig();

const Tokenomics: FC<ComponentDefault> = ({ className }) => {
  const { t } = useTranslation('home');
  const { classes, cx, theme } = useStyles();
  const { state } = useTokenomics();

  const customToolTip = (
    <CustomToolTip>
      {(x) => (
        <>
          <Typography variant="caption">{t(x.legendKey)}</Typography>
          <Typography variant="body1">
            {x.value} ({x.percent})
          </Typography>
        </>
      )}
    </CustomToolTip>
  );

  const data: CustomToolTipData[] = [
    {
      legendKey: 'unbonded',
      percentKey: 'unbondedPercent',
      value: numeral(state.unbonded).format('0,0'),
      rawValue: state.unbonded,
      percent: `${numeral((state.unbonded * 100) / state.total).format('0.00')}%`,
      fill: theme.palette.custom.tokenomics.one,
    },
    {
      legendKey: 'bonded',
      percentKey: 'bondedPercent',
      value: numeral(state.bonded).format('0,0'),
      rawValue: state.bonded,
      percent: `${numeral((state.bonded * 100) / state.total).format('0.00')}%`,
      fill: theme.palette.custom.tokenomics.two,
    },
    {
      legendKey: 'unbonding',
      value: numeral(state.unbonding).format('0a'),
      rawValue: state.unbonding,
      percent: `${numeral((state.unbonding * 100) / state.total).format('0.00')}%`,
      fill: theme.palette.custom.tokenomics.three,
    },
  ];

  return (
    <Box className={cx(classes.root, className)}>
      <Typography variant="h2">{t('tokenomics')}</Typography>
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <div className={classes.circleOut}>
            <div className={classes.circleIn}>
              <DynamicPieChart width={150} height={150}>
                <Pie
                  stroke="none"
                  data={data}
                  startAngle={0}
                  endAngle={360}
                  outerRadius={68}
                  fill="#8884d8"
                  dataKey="rawValue"
                  isAnimationActive={false}
                >
                  {data.map((entry) => (
                    <Cell key={entry.legendKey} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={customToolTip} />
              </DynamicPieChart>
            </div>
          </div>
        </div>

        <div className={classes.data}>
          {data.slice(0, 2).map((x) => (
            <div className="data__item" key={x.percentKey}>
              <div className="data__item-label">
                <div className="circle" style={{ background: x.fill }} />
                <Typography variant="h4">{x.percentKey ? t(x.percentKey) : ''}</Typography>
              </div>
              <Typography variant="h4" className="data__item-value">
                {x.value} <span>{tokenUnits?.[state.denom]?.display?.toUpperCase()}</span>
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Tokenomics;
