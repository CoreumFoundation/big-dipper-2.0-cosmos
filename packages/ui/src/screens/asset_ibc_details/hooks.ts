import * as R from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import { AssetsQuery, useAssetsQuery } from '@/graphql/types/general_types';
import axios from 'axios';

import chainConfig from '@/chainConfig';
import { useRouter } from 'next/router';
import { Asset } from '../assets/hooks';

const { chainType } = chainConfig();

interface AssetDetailsState {
  assetsLoading: boolean;
  loading: boolean;
  exists: boolean;
  data: {
    tokenHolderCount: any[];
    accountAggregate: any;
    supply: any;
  };
  assetsListItem: Asset | null;
  asset: any;
}

const formatAsset = ({ asset, additionalData }: { asset: Asset; additionalData: any }) => {
  const assetInTotalSupply = additionalData?.supply?.coins?.find(
    (coin: any) => coin.denom === asset.denom
  );

  const exponent = asset.extra.ibc_info?.precision ?? 0;
  const descriptionValue = asset.description;
  const display = asset.extra.ibc_info?.display_name ?? '';
  const supply = assetInTotalSupply?.amount ?? '0';
  const assetInHolders = additionalData?.tokenHolderCount?.find(
    (tokenHolderCount: any) => tokenHolderCount.denom === asset.denom
  );
  const holders = String(assetInHolders?.holders) ?? '0';
  const tokenType = 'ibc';
  const chain = asset.extra.ibc_info?.source_chain ?? '';

  return {
    ...asset,
    description: descriptionValue,
    exponent,
    display,
    holders,
    supply,
    tokenType,
    chain,
  };
};

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

export const useAssetDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<AssetDetailsState>({
    assetsLoading: true,
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
    assetsListItem: null,
    asset: null,
  });

  const handleSetState = useCallback(
    (stateChange: (prevState: AssetDetailsState) => AssetDetailsState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  const getAssetsList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/${chainType.toLowerCase()}/assets.json`
      );
      const selectedAssets = response.data.assets.filter(
        (item: any) => item.denom === `ibc/${router.query.address}`
      );

      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
        assetsListItem: selectedAssets[0],
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
        exists: false,
      }));
    }
  }, [router.query.address]);

  useEffect(() => {
    getAssetsList();
  }, [router]);

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
    const { assetsListItem, assetsLoading, loading, data } = state;

    if (!assetsListItem && !assetsLoading && !loading) {
      handleSetState((prevState) => ({
        ...prevState,
        exists: false,
      }));
    } else if (!assetsLoading && !loading && assetsListItem) {
      handleSetState((prevState) => ({
        ...prevState,
        asset: formatAsset({
          asset: assetsListItem,
          additionalData: data,
        }),
      }));
    }
  }, [state]);

  return {
    state,
  };
};
