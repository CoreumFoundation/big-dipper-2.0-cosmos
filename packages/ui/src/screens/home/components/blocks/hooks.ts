import * as R from 'ramda';
import { useCallback, useState } from 'react';
import {
  BlocksListenerSubscription,
  useBlocksListenerSubscription,
} from '@/graphql/types/general_types';
import type { BlocksState } from '@/screens/home/components/blocks/types';

const formatBlocks = (data: BlocksListenerSubscription) =>
  data.blocks.map((x) => {
    const proposerAddress = x?.validator?.validatorInfo?.operatorAddress ?? '';
    return {
      height: x.height,
      txs: x.txs ?? 0,
      hash: x.hash,
      timestamp: x.timestamp,
      proposer: proposerAddress,
      moniker: x.validator?.validatorDescriptions?.[0]?.moniker || undefined,
      avatarUrl: x.validator?.validatorDescriptions?.[0]?.avatarUrl || undefined,
    };
  }) ?? [];

export const useBlocks = () => {
  const [state, setState] = useState<BlocksState>({
    loading: true,
    items: [],
  });

  const handleSetState = useCallback((stateChange: (prevState: BlocksState) => BlocksState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  // ================================
  // block subscription
  // ================================
  useBlocksListenerSubscription({
    onData: (data) => {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        items: data.data.data ? formatBlocks(data.data.data) : [],
      }));
    },
  });

  return {
    state,
  };
};
