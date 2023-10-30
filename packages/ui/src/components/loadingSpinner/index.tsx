import useStyles from '@/components/loadingSpinner/styles';
import SpinnerSvg from './spinner.svg';

interface SpinnerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyle?: any;
}

const Spinner = ({ customStyle = {} }: SpinnerProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root} style={{ ...customStyle }}>
      <SpinnerSvg
        className="spinner"
        style={{
          animation: 'spin 1s infinite linear',
        }}
      />
    </div>
  );
};

export default Spinner;
