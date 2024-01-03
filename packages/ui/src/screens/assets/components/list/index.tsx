import { FC, ReactNode, useMemo } from 'react';
import Box from '@/components/box';
import LoadAndExist from '@/components/load_and_exist';
import NoData from '@/components/no_data';
import Desktop from '@/screens/assets/components/list/components/desktop';
import Mobile from '@/screens/assets/components/list/components/mobile';
import Tabs from '@/screens/assets/components/list/components/tabs';
import { useAssets } from '@/screens/assets/hooks';
import useStyles from '@/screens/assets/components/list/styles';
import { useDisplayStyles } from '@/styles/useSharedStyles';

const List: FC<ComponentDefault> = ({ className }) => {
  const { classes, cx } = useStyles();
  const display = useDisplayStyles().classes;
  const { state, handleTabChange, handleSort, sortItems } = useAssets();
  const items = useMemo(() => sortItems(state.items), [state.items, sortItems]);

  let list: ReactNode;

  if (!items.length) {
    list = <NoData />;
  } else {
    list = (
      <>
        <Desktop
          sortDirection={state.sortDirection}
          sortKey={state.sortKey}
          handleSort={handleSort}
          items={items}
          className={display.hiddenUntilLg}
        />
        <Mobile items={items} className={cx(display.hiddenWhenLg, classes.mobile)} />
      </>
    );
  }

  return (
    <LoadAndExist
      loading={state.loading || state.assetsLoading || state.metadataLoading}
      exists={state.exists}
    >
      <Box className={className}>
        <Tabs tab={state.tab} handleTabChange={handleTabChange} />
        <div className={classes.list}>{list}</div>
      </Box>
    </LoadAndExist>
  );
};

export default List;
