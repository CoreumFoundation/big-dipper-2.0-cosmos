import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, Fragment } from 'react';
import { formatNumber, getFormatString } from '@/utils/format_token';
import type { OtherTokenType } from '@/screens/account_details/types';
import useStyles from '@/screens/account_details/components/other_tokens/components/mobile/styles';
import Image from 'next/image';
import numeral from 'numeral';
import Big from 'big.js';
import { formatNumberWithThousandsSeparator } from '../desktop';

type MobileProps = {
  className?: string;
  items?: OtherTokenType[];
};

const Mobile: FC<MobileProps> = ({ className, items }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('accounts');
  return (
    <div className={className}>
      {items?.map((x, i) => {
        const { logoURL, displayName, chain } = x;
        let available = x.exponent
          ? numeral(+x.available.value / 10 ** x.exponent).format(getFormatString(x.exponent))
          : formatNumber(x.available.value, x.available.exponent);

        if (Number(x.available.value) > Number.MAX_SAFE_INTEGER && x.exponent) {
          const ratio = Big(10 ** x.exponent);
          const value = Big(x.available.value).div(ratio).toFixed(x.exponent);
          available = formatNumberWithThousandsSeparator(value);
        }

        const reward = x.reward ? formatNumber(x.reward.value, x.reward.exponent) : '';
        const isLast = !items || i === items.length - 1;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`votes-mobile-${i}`}>
            <div className={classes.list}>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('token')}
                </Typography>
                <Typography variant="body1" className="value" component="div">
                  {displayName && chain ? (
                    <div className={classes.nameBlock}>
                      {logoURL && (
                        <div className={classes.assetLogo}>
                          <Image src={logoURL} alt={x.denom} width={24} height={24} />
                        </div>
                      )}
                      <div className={classes.nameColumn}>
                        <div className={classes.name}>{displayName}</div>
                        {!logoURL && <div className={classes.denom}>{x.denom}</div>}
                        <div className={classes.chainRow}>
                          <div className={classes.nameChain}>Chain: {chain}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    x.denom
                  )}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('available')}
                </Typography>
                <Typography variant="body1" className="value">
                  {available}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('reward')}
                </Typography>
                <Typography variant="body1" className="value">
                  {reward}
                </Typography>
              </div>
            </div>
            {!isLast && <Divider />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
