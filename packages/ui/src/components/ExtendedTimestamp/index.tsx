import Typography from '@mui/material/Typography';
import { FC, useEffect, useRef, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

/* styles */
const useStyles = makeStyles()((theme) => ({
  root: {
    textAlign: 'right',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
    width: '100%',
  },
  formatDate: {
    display: 'flex',
    columnGap: theme.spacing(0.5),
    width: '100%',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.5),
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
}));

/* types */
interface ExtendedTimestampProps {
  timestamp: string;
  flexEnd?: boolean;
}

const ExtendedTimestamp: FC<ExtendedTimestampProps> = ({ timestamp, flexEnd = true }) => {
  const [timePassedValue, setTimePassedValue] = useState('');
  const interval = useRef<NodeJS.Timer>();

  const { classes, cx } = useStyles();
  const inputDate = new Date(timestamp);

  const currentDate = new Date();
  const timePassedMs = currentDate.getTime() - inputDate.getTime();

  const dayValue = inputDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const formatTimestamp = inputDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  useEffect(() => {
    if (timestamp)
      interval.current = setInterval(() => {
        let timePassed = '';
        if (timePassedMs < 60000) {
          timePassed = `${Math.floor(timePassedMs / 1000)}s`;
        } else if (timePassedMs < 3600000) {
          timePassed = `${Math.floor(timePassedMs / 60000)}m`;
        } else if (timePassedMs < 86400000) {
          timePassed = `${Math.floor(timePassedMs / 3600000)}h`;
        } else if (timePassedMs < 2592000000) {
          // Approximate duration for a month
          timePassed = `${Math.floor(timePassedMs / 86400000)}d`;
        } else {
          timePassed = `${Math.floor(timePassedMs / 2592000000)}mo`;
        }

        setTimePassedValue(timePassed);
      }, 1000);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  });

  // eslint-disable-next-line consistent-return
  return (
    <Typography variant="body1" component="div" className={classes.time}>
      {dayValue}
      <div className={cx(classes.formatDate, flexEnd ? classes.flexEnd : '')}>
        {formatTimestamp}
        {timePassedValue ? <span>({timePassedValue} ago)</span> : ''}
      </div>
    </Typography>
  );
};

export default ExtendedTimestamp;
