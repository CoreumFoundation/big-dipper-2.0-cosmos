import useStyles from '@/components/result/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import Check from '@/assets/icon-check.svg';
import Cross from '@/assets/icon-cross.svg';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

type ResultProps = {
  className?: string;
  success?: boolean;
  displayLabel?: boolean;
};

const Result: FC<ResultProps> = ({ className, success, displayLabel = true }) => {
  const { t } = useTranslation('common');
  const { classes, cx } = useStyles();

  return (
    <span
      className={cx(classes.root, className, {
        [classes.success]: success,
        [classes.fail]: !success,
      })}
    >
      {success ? (
        <>
          <Tooltip
            TransitionComponent={Zoom}
            title={<pre>{t('success')}</pre>}
            placement="bottom"
            arrow
          >
            <span>
              <Check />
            </span>
          </Tooltip>
          {displayLabel && (
            <Typography component="span" variant="body1">
              {t('success')}
            </Typography>
          )}
        </>
      ) : (
        <>
          <Tooltip
            TransitionComponent={Zoom}
            title={<pre>{t('fail')}</pre>}
            placement="bottom"
            arrow
          >
            <span>
              <Cross />
            </span>
          </Tooltip>
          {displayLabel && (
            <Typography component="span" variant="body1">
              {t('fail')}
            </Typography>
          )}
        </>
      )}
    </span>
  );
};

export default Result;
