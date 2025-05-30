import { FC, ReactNode, useMemo } from 'react';
import Box from '@/components/box';
import LoadAndExist from '@/components/load_and_exist';
import NoData from '@/components/no_data';
import useShallowMemo from '@/hooks/useShallowMemo';
import { useProfilesRecoil } from '@/recoil/profiles/hooks';
import Desktop from '@/screens/validators/components/list/components/desktop';
import Mobile from '@/screens/validators/components/list/components/mobile';
import Tabs from '@/screens/validators/components/list/components/tabs';
import { useValidators } from '@/screens/validators/components/list/hooks';
import useStyles from '@/screens/validators/components/list/styles';
import { useDisplayStyles } from '@/styles/useSharedStyles';

const List: FC<ComponentDefault> = ({ className }) => {
  const { classes, cx } = useStyles();
  const display = useDisplayStyles().classes;
  const { state, handleTabChange, handleSort, sortItems, search } = useValidators();
  const validatorsMemo = useShallowMemo(state.items.map((x) => x.validator));

  const { profiles: dataProfiles, loading } = useProfilesRecoil(validatorsMemo);

  const items = useMemo(
    () =>
      sortItems(
        state.items.map((x, i) => ({
          ...x,
          validator: {
            address: dataProfiles?.[i].address,
            imageUrl: x.overview?.avatarUrl || dataProfiles?.[i].imageUrl,
            name: x.overview?.moniker || dataProfiles?.[i].name,
          },
        }))
      ),
    [state.items, dataProfiles, sortItems]
  );

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
          search={search}
          className={display.hiddenUntilLg}
        />
        <Mobile
          items={items}
          search={search}
          className={cx(display.hiddenWhenLg, classes.mobile)}
        />
      </>
    );
  }

  return (
    <LoadAndExist loading={state.loading || !!loading} exists={state.exists}>
      <Tabs tab={state.tab} handleTabChange={handleTabChange} />
      <Box className={cx(classes.box, className)}>{list}</Box>
    </LoadAndExist>
  );
};

export default List;
