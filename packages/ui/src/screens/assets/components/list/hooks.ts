import * as R from 'ramda';
import { SyntheticEvent, useCallback, useState } from 'react';
// import { useAssetsQuery, AssetsQuery } from '@/graphql/types/general_types';
import type { AssetsState, AssetFTType } from '@/screens/assets/components/list/types';

// ==========================
// Parse data
// ==========================
// const formatAssets = (data: AssetsQuery) => {};

const mockedItems: AssetFTType[] = [
  {
    id: 1,
    name: 'Coreum',
    logo: '',
    token_type: 'GOV',
    price: '0.63',
    price_change: '0.02',
    supply: '500000000',
    holders: '559305',
  },
  {
    id: 2,
    name: 'Coreum',
    logo: '',
    token_type: 'IBC',
    price: '0.63',
    price_change: '0.02',
    supply: '500000000',
    holders: '559305',
  },
  {
    id: 3,
    name: 'Coreum',
    logo: '',
    token_type: 'Asset',
    price: '0.63',
    price_change: '-0.02',
    supply: '500000000',
    holders: '559305',
  },
  {
    id: 4,
    name: 'Coreum',
    logo: '',
    token_type: 'GOV',
    price: '0.63',
    price_change: '0.02',
    supply: '500000000',
    holders: '559305',
  },
  {
    id: 5,
    name: 'Coreum',
    logo: '',
    token_type: 'IBC',
    price: '0.63',
    price_change: '-0.02',
    supply: '500000000',
    holders: '559305',
  },
  {
    id: 6,
    name: 'Coreum',
    logo: '',
    token_type: 'Asset',
    price: '0.63',
    price_change: '0.02',
    supply: '500000000',
    holders: '559305',
  },
];

export const useAssets = () => {
  const [state, setState] = useState<AssetsState>({
    loading: false,
    exists: true,
    items: mockedItems,
    tab: 0,
    sortKey: '',
    sortDirection: 'desc',
  });

  // const handleSetState = useCallback(
  //   (stateChange: (prevState: AssetsState) => AssetsState) => {
  //     setState((prevState) => {
  //       const newState = stateChange(prevState);
  //       return R.equals(prevState, newState) ? prevState : newState;
  //     });
  //   },
  //   []
  // );

  // ==========================
  // Fetch Data
  // ==========================
  // useAssetsQuery({
  //   onCompleted: (data) => {
  //     handleSetState((prevState) => ({
  //       ...prevState,
  //       loading: false,
  //       // ...formatAssets(data),
  //     }));
  //   },
  //   onError: () => {
  //     handleSetState((prevState) => ({
  //       ...prevState,
  //       loading: false,
  //       exists: false,
  //     }));
  //   },
  // });

  const handleTabChange = useCallback(
    (_event: SyntheticEvent<Element, globalThis.Event>, newValue: number) => {
      // eslint-disable-next-line no-console
      setState((prevState) => ({
        ...prevState,
        tab: newValue,
      }));
    },
    []
  );

  const handleSort = useCallback(
    (key: string) => {
      if (key === state.sortKey) {
        setState((prevState) => ({
          ...prevState,
          sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          sortKey: key,
          sortDirection: 'asc', // new key so we start the sort by asc
        }));
      }
    },
    [state.sortKey]
  );

  const sortItems = useCallback(
    (items: AssetFTType[]) => {
      const sorted: AssetFTType[] = R.clone(items);

      if (state.sortKey && state.sortDirection) {
        sorted.sort((a, b) => {
          let compareA = R.pathOr('', [...state.sortKey.split('.')], a);
          let compareB = R.pathOr('', [...state.sortKey.split('.')], b);

          if (typeof compareA === 'string' && typeof compareB === 'string') {
            compareA = compareA.toLowerCase();
            compareB = compareB.toLowerCase();
          }

          if (compareA < compareB) {
            return state.sortDirection === 'asc' ? -1 : 1;
          }
          if (compareA > compareB) {
            return state.sortDirection === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      return sorted;
    },
    [state.sortDirection, state.sortKey]
  );

  return {
    state,
    handleTabChange,
    handleSort,
    sortItems,
  };
};
