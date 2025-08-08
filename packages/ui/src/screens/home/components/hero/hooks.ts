import * as R from 'ramda';
import { useCallback, useEffect, useMemo, useState } from 'react';
import chainConfig from '@/chainConfig';
import { useTokenPriceHistoryQuery } from '@/graphql/types/general_types';
import type { HeroState } from '@/screens/home/components/hero/types';

const { primaryTokenUnit, tokenUnits } = chainConfig();

export const useHero = () => {
  const itemsToLoad = 7 * 24 * 4;

  const [state, setState] = useState<HeroState>({
    loading: true,
    exists: true,
    tokenPriceHistory: [],
    isAllDataLoaded: false,
    dataLoading: true,
  });

  const handleSetState = useCallback((stateChange: (prevState: HeroState) => HeroState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  const tokenPriceHistoryQuery = useTokenPriceHistoryQuery({
    variables: {
      limit: 100,
      denom: tokenUnits?.[primaryTokenUnit]?.display,
    },
    onCompleted: (data) => {
      if (data?.tokenPrice) {
        handleSetState((prevState) => ({
          ...prevState,
          dataLoading: itemsToLoad <= data.tokenPrice.length,
          tokenPriceHistory: data.tokenPrice.map((x) => ({
            price: x.price,
            timestamp: x.timestamp,
          })),
        }));
      }
    },
    onError: () => {
      handleSetState((prevState) => ({ ...prevState, dataLoading: false }));
    },
  });

  const loadMoreData = useCallback(async () => {
    const limit =
      itemsToLoad - state.tokenPriceHistory.length > 100
        ? 100
        : itemsToLoad - state.tokenPriceHistory.length;

    await tokenPriceHistoryQuery
      .fetchMore({
        variables: {
          offset: state.tokenPriceHistory.length,
          limit,
        },
      })
      .then(({ data }) => {
        if (data?.tokenPrice) {
          handleSetState((prevState) => ({
            ...prevState,
            dataLoading: false,
            tokenPriceHistory: prevState.tokenPriceHistory.concat(
              data.tokenPrice.map((x) => ({ price: x.price, timestamp: x.timestamp }))
            ),
          }));
        }
      });

    if (limit !== 100) {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        isAllDataLoaded: true,
      }));
    }
  }, [handleSetState, itemsToLoad, state.tokenPriceHistory.length, tokenPriceHistoryQuery]);

  useEffect(() => {
    if (!state.isAllDataLoaded && !state.dataLoading) {
      handleSetState((prevState) => ({ ...prevState, dataLoading: true }));
      loadMoreData();
    }
  }, [handleSetState, loadMoreData, state.dataLoading, state.isAllDataLoaded, state.loading]);

  const formattedData = useMemo(() => {
    const oneWeekAgo = Date.now() - 24 * 60 * 60 * 1000;

    return state.tokenPriceHistory
      .filter((x) => new Date(x.timestamp).getTime() >= oneWeekAgo)
      .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
      .map((x) => {
        const time = new Date(x.timestamp);

        return {
          value: x.price as number,
          time: Math.floor(time.getTime() / 1000),
        };
      });
  }, [state.tokenPriceHistory]);

  return {
    state,
    tokenPriceHistory: formattedData,
  };
};
