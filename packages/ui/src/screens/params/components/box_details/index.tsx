import Typography from '@mui/material/Typography';
import { FC, isValidElement, ReactNode } from 'react';
import Box from '@/components/box';
import useStyles from '@/screens/params/components/box_details/styles';

type BoxDetailsProps = {
  className?: string;
  bodyClassName?: string;
  title?: string | ReactNode;
  titleAction?: ReactNode;
  details: {
    key: string;
    label: string | number | ReactNode;
    detail?: string | number | ReactNode;
    className?: string;
  }[];
};

const BoxDetails: FC<BoxDetailsProps> = ({
  className,
  bodyClassName,
  title,
  titleAction,
  details,
}) => {
  const { classes, cx } = useStyles();
  return (
    <Box className={cx(classes.root, className)}>
      {!!title && (
        <div className={cx(classes.header)}>
          {isValidElement(title) ? title : <Typography variant="h2">{title}</Typography>}
          {!!titleAction && titleAction}
        </div>
      )}
      <div className={cx(classes.body, bodyClassName)}>
        {details.map((x) => (
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
                {x.detail}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default BoxDetails;
