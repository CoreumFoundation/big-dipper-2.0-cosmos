import * as R from 'ramda';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { AssetsQuery, useAssetsQuery } from '@/graphql/types/general_types';
import axios from 'axios';

import chainConfig from '@/chainConfig';

const { chainType, primaryTokenUnit, tokenUnits } = chainConfig();

interface Asset {
  denom: string;
  description: string;
  ibc_info: {
    display_name: string;
    precision: number;
  };
  logo_URIs: {
    png: string;
    svg: string;
  };
  urls: {
    website: string;
    github: string;
    whitepaper: string;
  };
  social_media: {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    discord: string;
    youtube: string;
    telegram: string;
    tiktok: string;
  };
}

interface AssetsState {
  assetsLoading: boolean;
  metadataLoading: boolean;
  loading: boolean;
  exists: boolean;
  data: {
    tokenHolderCount: any[];
    accountAggregate: any;
    supply: any;
  };
  metadatas: any[];
  items: any[];
  assetsList: Asset[];
  tab: number;
  sortKey: string;
  sortDirection: 'asc' | 'desc';
}

const formatAssets = ({
  metadatas,
  assets,
  additionalData,
}: {
  metadatas: any[];
  assets: Asset[];
  additionalData: any;
}) =>
  assets.map((item: Asset) => {
    let holders = '0';
    let tokenType = '';

    const assetInMetadata = metadatas.find((metadataItem: any) => metadataItem.base === item.denom);
    const assetInTotalSupply = additionalData.supply.coins.find(
      (coin: any) => coin.denom === item.denom
    );

    const exponent = assetInMetadata?.denom_units[1]?.exponent ?? 0;
    const descriptionValue = item.description.length
      ? item.description
      : assetInMetadata.description;
    let display = assetInMetadata?.display ?? '';
    const symbol = assetInMetadata?.symbol ?? '';
    const supply = assetInTotalSupply?.amount ?? '0';

    if (item.denom === primaryTokenUnit) {
      const { count } = additionalData.accountAggregate.aggregate;
      holders = count;
      tokenType = 'gov';
      display = tokenUnits[primaryTokenUnit]?.display;
    } else {
      const assetInHolders = additionalData.tokenHolderCount.find(
        (tokenHolderCount: any) => tokenHolderCount.denom === item.denom
      );
      holders = String(assetInHolders?.holders) ?? '0';

      tokenType = item.denom.includes('ibc') ? 'ibc' : 'asset';
    }

    return {
      ...item,
      description: descriptionValue,
      exponent,
      display,
      symbol,
      holders,
      supply,
      tokenType,
    };
  });

const formatAssetsQueryResponse = (data: any) => {
  const tokenHolderCount = data?.token_holder_count ?? [];
  const accountAggregate = data?.account_aggregate ?? { aggregate: { count: 0 } };
  const supply = data?.supply[0] ?? { coins: [], height: 0 };

  return {
    tokenHolderCount,
    accountAggregate,
    supply,
  };
};

export const useAssets = () => {
  const [state, setState] = useState<AssetsState>({
    assetsLoading: true,
    metadataLoading: true,
    loading: true,
    exists: true,
    data: {
      supply: {
        coins: [],
        height: 0,
      },
      tokenHolderCount: [],
      accountAggregate: {
        aggregate: {
          count: 0,
        },
      },
    },
    metadatas: [],
    items: [],
    assetsList: [],
    tab: 0,
    sortKey: '',
    sortDirection: 'desc',
  });

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
    (items: any[]) => {
      const sorted: any[] = R.clone(items);

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

  const getAssetsList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/${chainType.toLowerCase()}/assets.json`
      );

      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
        assetsList: response.data.assets,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
        exists: false,
      }));
    }
  }, []);

  const getDenomMetadatas = useCallback(async () => {
    try {
      const {
        data: {
          pagination: { total },
        },
      } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/cosmos/bank/v1beta1/denoms_metadata`
      );
      const {
        data: { metadatas },
      } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/cosmos/bank/v1beta1/denoms_metadata?pagination.limit=${total}`
      );

      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
        metadatas,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    getAssetsList();
    getDenomMetadatas();
  }, []);

  const handleSetState = useCallback((stateChange: (prevState: AssetsState) => AssetsState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  useAssetsQuery({
    onCompleted: (data: AssetsQuery) => {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        data: formatAssetsQueryResponse(data),
      }));
    },
    onError: () => {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    },
  });

  useEffect(() => {
    if (!state.assetsLoading && !state.metadataLoading && !state.loading) {
      handleSetState((prevState) => ({
        ...prevState,
        items: formatAssets({
          metadatas: state.metadatas,
          assets: state.assetsList,
          additionalData: state.data,
        }),
      }));
    }
  }, [
    state.assetsLoading,
    state.metadataLoading,
    state.loading,
    state.data,
    state.assetsList,
    state.metadatas,
  ]);

  return {
    state,
    handleTabChange,
    handleSort,
    sortItems,
  };
};
