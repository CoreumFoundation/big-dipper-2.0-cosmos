import { FC } from 'react';
import useStyles from '@/components/nav/components/desktop/components/action_bar/styles';
import SearchBar from '@/components/nav/components/search_bar';
import { useGetComponentDimension } from '@/hooks/use_get_component_dimension';
import NetworkSelector from '@/components/network_selector';

type ActionBarProps = {
  isNetwork: boolean;
  className?: string;
};

const ActionBar: FC<ActionBarProps> = ({ className, isNetwork }) => {
  const { ref: heightRef } = useGetComponentDimension();
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)} ref={heightRef}>
      <div className={classes.actions}>
        <SearchBar className={cx(classes.searchBar, { open: isNetwork })} />
        <NetworkSelector />
      </div>
    </div>
  );
};

export default ActionBar;
