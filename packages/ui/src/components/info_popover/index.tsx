import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import { FC, ReactNode } from 'react';
import useStyles from '@/components/info_popover/styles';
import { useInfoPopover } from '@/components/info_popover/hooks';
import HelpIcon from 'shared-utils/assets/icon-help.svg';

type InfoPopoverProps = {
  className?: string;
  content?: string | ReactNode;
  display?: string | ReactNode;
  popoverClassName?: string;
};

const InfoPopover: FC<InfoPopoverProps> = ({ className, content, display, popoverClassName }) => {
  const { handlePopoverOpen, handlePopoverClose, anchorEl, open } = useInfoPopover();

  const { classes, cx } = useStyles();

  return (
    <>
      <span
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.root}
      >
        {display || <HelpIcon className={cx(className, classes.icon)} />}
      </span>
      <Popover
        id="mouse-over-popover"
        className={cx(classes.popover, popoverClassName)}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Paper elevation={0} className={className}>
          {content}
        </Paper>
      </Popover>
    </>
  );
};

export default InfoPopover;
