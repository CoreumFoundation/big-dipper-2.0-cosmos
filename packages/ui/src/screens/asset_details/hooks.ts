import * as R from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import { AssetsQuery, useAssetsQuery } from '@/graphql/types/general_types';
import axios from 'axios';

import chainConfig from '@/chainConfig';
import { useRouter } from 'next/router';

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

interface AssetDetailsState {
  assetsLoading: boolean;
  metadataLoading: boolean;
  loading: boolean;
  exists: boolean;
  data: {
    tokenHolderCount: any[];
    accountAggregate: any;
    supply: any;
  };
  assetsListItem: Asset | null;
  metadata: any;
  asset: any;
}

const formatAsset = ({
  metadata,
  asset,
  additionalData,
}: {
  metadata: any;
  asset: Asset;
  additionalData: any;
}) => {
  let holders = '0';
  let tokenType = '';

  const assetInTotalSupply = additionalData.supply.coins.find(
    (coin: any) => coin.denom === asset.denom
  );

  const exponent = metadata.denom_units[1]?.exponent ?? 0;
  const descriptionValue = asset.description.length ? asset.description : metadata.description;
  let display = metadata.display ?? '';
  const symbol = metadata.symbol ?? '';
  const supply = assetInTotalSupply?.amount ?? '0';

  if (asset.denom === primaryTokenUnit) {
    const { count } = additionalData.accountAggregate.aggregate;
    holders = count;
    tokenType = 'gov';
    display = tokenUnits[primaryTokenUnit]?.display;
  } else {
    const assetInHolders = additionalData.tokenHolderCount.find(
      (tokenHolderCount: any) => tokenHolderCount.denom === asset.denom
    );
    holders = String(assetInHolders?.holders) ?? '0';

    tokenType = asset.denom.includes('ibc') ? 'ibc' : 'asset';
  }

  return {
    ...asset,
    description: descriptionValue,
    exponent,
    display,
    symbol,
    holders,
    supply,
    tokenType,
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
    metadata: null,
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
        (item: any) => item.denom === router.query.address
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

  const getDenomMetadatas = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/cosmos/bank/v1beta1/denoms_metadata/${
          router.query.address
        }`
      );

      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
        metadata: data.metadata,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
      }));
    }
  }, [router.query.address, chainType]);

  useEffect(() => {
    getAssetsList();
    getDenomMetadatas();
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
    if (!state.assetsLoading && !state.metadataLoading && !state.loading) {
      handleSetState((prevState) => ({
        ...prevState,
        asset: formatAsset({
          metadata: state.metadata,
          asset: state.assetsListItem!,
          additionalData: state.data,
        }),
      }));
    }
  }, [
    state.assetsLoading,
    state.metadataLoading,
    state.loading,
    state.data,
    state.assetsListItem,
    state.metadata,
  ]);

  return {
    state,
  };
};