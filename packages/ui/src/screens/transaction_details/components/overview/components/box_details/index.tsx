import Typography from '@mui/material/Typography';
import { FC, isValidElement, ReactNode } from 'react';
import Box from '@/components/box';
import useStyles from '@/screens/transaction_details/components/overview/components/box_details/styles';

type BoxDetailsProps = {
  className?: string;
  title?: string | ReactNode;
  titleAction?: ReactNode;
  details: {
    key: string;
    label: string | number | ReactNode;
    detail?: string | number | ReactNode;
    className?: string;
    fullWidth?: boolean;
  }[];
};

const BoxDetails: FC<BoxDetailsProps> = ({ className, title, titleAction, details }) => {
  const { classes, cx } = useStyles();

  const fullWidthDetails = details.filter((item) => item.fullWidth);
  const halfWidthDetails = details.filter((item) => !item.fullWidth);

  return (
    <Box className={cx(classes.root, className)}>
      {!!title && (
        <div className={cx(classes.header, classes.item)}>
          {isValidElement(title) ? title : <Typography variant="h2">{title}</Typography>}
          {!!titleAction && titleAction}
        </div>
      )}
      <div className={classes.body}>
        <div className={classes.bodyFull}>
          {fullWidthDetails.map((x) => (
            <div key={x.key} className={cx(classes.item, x.className)}>
              {isValidElement(x.label) ? (
                <div className="label">{x.label}</div>
              ) : (
                <Typography variant="body1" className="label">
                  {x.label}
                </Typography>
              )}

              {isValidElement(x.detail) ? (
                <div className="detail">{x.detail}</div>
              ) : (
                <Typography variant="body1" className="detail">
                  {x.detail || '---'}
                </Typography>
              )}
            </div>
          ))}
        </div>
        <div className={classes.bodyFlex}>
          {halfWidthDetails.map((x) => (
            <div key={x.key} className={cx(classes.item, x.className)}>
              {isValidElement(x.label) ? (
                <div className="label">{x.label}</div>
              ) : (
                <Typography variant="body1" className="label">
                  {x.label}
                </Typography>
              )}

              {isValidElement(x.detail) ? (
                <div className="detail">{x.detail}</div>
              ) : (
                <Typography variant="body1" className="detail">
                  {x.detail || '---'}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default BoxDetails;
