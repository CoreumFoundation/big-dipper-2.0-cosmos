import Typography from '@mui/material/Typography';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const inputDate = useMemo(
    () => new Date(timestamp.endsWith('Z') ? timestamp : `${timestamp}Z`),
    [timestamp]
  );
  const currentDate = useMemo(() => new Date(), []);
  const timePassedMs = useMemo(
    () => currentDate.getTime() - inputDate.getTime(),
    [currentDate, inputDate]
  );

  inputDate.setTime(inputDate.getTime() + inputDate.getTimezoneOffset() * 60000);

  const dayValue = useMemo(
    () =>
      inputDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
    [inputDate]
  );

  const formatTimestamp = useMemo(
    () =>
      inputDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [inputDate]
  );

  const getTimePassedValue = useCallback((timeMs: number) => {
    let timePassed = '';
    if (timeMs < 60000) {
      timePassed = `${Math.floor(timeMs / 1000)}s`;
    } else if (timeMs < 3600000) {
      timePassed = `${Math.floor(timeMs / 60000)}m`;
    } else if (timeMs < 86400000) {
      timePassed = `${Math.floor(timeMs / 3600000)}h`;
    } else if (timeMs < 2592000000) {
      // Approximate duration for a month
      timePassed = `${Math.floor(timeMs / 86400000)}d`;
    } else {
      timePassed = `${Math.floor(timeMs / 2592000000)}mo`;
    }

    return timePassed;
  }, []);

  useEffect(() => {
    const timePassed = getTimePassedValue(timePassedMs);

    setTimePassedValue(timePassed);
  }, []);

  useEffect(() => {
    if (timestamp)
      interval.current = setInterval(() => {
        const timePassed = getTimePassedValue(timePassedMs);

        setTimePassedValue(timePassed);
      }, 1000);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  });

  if (!timestamp) return null;

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
