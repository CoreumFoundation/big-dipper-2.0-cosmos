import Avatar from '@/components/avatar';
import useStyles from '@/components/avatar_name/styles';
import { Typography } from '@mui/material';
import { ADDRESS_DETAILS } from '@/utils/go_to_page';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Link from 'next/link';
import { FC } from 'react';

const AvatarName: FC<AvatarName & JSX.IntrinsicElements['div']> = ({
  className,
  address,
  name,
  imageUrl,
  href = ADDRESS_DETAILS,
  image,
  target,
  shorten,
  isMobile,
  ...props
}) => {
  const { classes, cx } = useStyles();

  if (isMobile) {
    return (
      <Link shallow href={href(address)} target={target}>
        <span className={cx(classes.root, className)} {...props}>
          <Avatar className={classes.avatar} address={address} imageUrl={imageUrl ?? undefined} />
          {/* <MiddleEllipsis className={classes.text} content={name} /> */}

          <Typography variant="body1" className={shorten ? classes.short : undefined}>
            {name}
          </Typography>
        </span>
      </Link>
    );
  }

  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={<pre>{address}</pre>}
      placement="bottom"
      arrow
      PopperProps={{ className: classes.popper }}
      slotProps={{ tooltip: { className: classes.tooltip } }}
    >
      <Link shallow href={href(address)} target={target}>
        <span className={cx(classes.root, className)} {...props}>
          <Avatar className={classes.avatar} address={address} imageUrl={imageUrl ?? undefined} />
          {/* <MiddleEllipsis className={classes.text} content={name} /> */}
          <Typography variant="body1" className={shorten ? classes.short : undefined}>
            {name}
          </Typography>
        </span>
      </Link>
    </Tooltip>
  );
};

export default AvatarName;
