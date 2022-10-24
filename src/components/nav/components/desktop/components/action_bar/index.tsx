import React from 'react';
import classnames from 'classnames';
import { useGetComponentDimension } from '@hooks';
import { useStyles } from './styles';
import SearchBar from '../../../seach_bar';

const ActionBar: React.FC<{
  isNetwork: boolean;
  className?: string;
  // toggleNetwork: () => void;
}> = ({
  className,
  isNetwork,
}) => {
  const { ref: heightRef } = useGetComponentDimension();
  const classes = useStyles();
  return (
    <div className={classnames(className, classes.root)} ref={heightRef}>
      <div className={classes.actions}>
        <SearchBar
          className={classnames(classes.searchBar, { open: isNetwork })}
        />
      </div>
    </div>
  );
};

export default ActionBar;
