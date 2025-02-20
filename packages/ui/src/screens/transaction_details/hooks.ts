import { useRouter } from 'next/router';
import * as R from 'ramda';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import { TransactionDetailsQuery, useTransactionDetailsQuery } from '@/graphql/types/general_types';
import type { TransactionState } from '@/screens/transaction_details/types';
import { formatToken } from '@/utils/format_token';
import axios from 'axios';
import chainConfig from '@/chainConfig';

const { chainType } = chainConfig();

// =============================
// overview
// =============================
const formatOverview = (data: TransactionDetailsQuery) => {
  const { fee, logs } = data.transaction[0];
  const feeAmount = fee?.amount?.[0] ?? {
    denom: '',
    amount: 0,
  };

  const { success } = data.transaction[0];
  const overview = {
    hash: data.transaction[0].hash,
    height: data.transaction[0].height,
    timestamp: data.transaction[0].block.timestamp,
    fee: formatToken(feeAmount.amount, feeAmount.denom),
    gasUsed: data.transaction[0].gasUsed,
    gasWanted: data.transaction[0].gasWanted,
    success,
    memo: data.transaction[0].memo ?? '',
    error: success ? '' : (data.transaction[0].rawLog ?? ''),
    sender: '',
    receiver: '',
    amount: '',
    logs: [],
  };

  let eventLogs = '';
  const execEvent = logs[0]?.events.find((item: any) => item.type === 'cosmos.group.v1.EventExec');
  if (!execEvent) {
    return overview;
  }

  const execEventFailed = execEvent.attributes.find(
    (item: any) => item.key === 'result' && item.value.includes('FAILURE')
  );
  if (!execEventFailed) {
    return overview;
  }

  const execEventLog = execEvent.attributes.find((item: any) => item.key === 'logs');
  if (execEventLog) {
    eventLogs = execEventLog.value;
  }

  return {
    ...overview,
    logs: eventLogs,
  };
};

// =============================
// logs
// =============================
const formatLogs = (data: TransactionDetailsQuery) => {
  const { logs } = data.transaction[0];
  return logs;
};

// =============================
// messages
// =============================
const formatMessages = (data: TransactionDetailsQuery) => {
  const messages = convertMsgsToModels(data.transaction[0]);
  return {
    filterBy: 'none',
    viewRaw: false,
    items: messages,
  };
};

// ===============================
// Parse data
// ===============================
const formatTransactionDetails = (data: TransactionDetailsQuery) => {
  const stateChange: Partial<TransactionState> = {
    loading: false,
  };

  if (!data.transaction.length) {
    stateChange.exists = false;
    return stateChange;
  }

  stateChange.overview = formatOverview(data);
  stateChange.logs = formatLogs(data);
  stateChange.messages = formatMessages(data);
  return stateChange;
};

export const useTransactionDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<TransactionState>({
    exists: true,
    loading: true,
    overview: {
      hash: '',
      height: 0,
      timestamp: '',
      fee: {
        value: '0',
        displayDenom: '',
        baseDenom: '',
        exponent: 0,
      },
      gasUsed: 0,
      gasWanted: 0,
      success: false,
      memo: '',
      error: '',
      sender: '',
      receiver: '',
      amount: '',
    },
    logs: null,
    messages: {
      filterBy: 'none',
      viewRaw: false,
      items: [],
    },
    assets: [],
    metadatas: [],
    assetsLoading: true,
    metadataLoading: true,
  });

  const handleSetState = useCallback(
    (stateChange: (prevState: TransactionState) => TransactionState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  useEffect(() => {
    handleSetState((prevState) => ({
      ...prevState,
      loading: true,
      exists: true,
    }));
  }, [handleSetState]);

  // ===============================
  // Fetch data
  // ===============================
  useTransactionDetailsQuery({
    variables: {
      hash: router.query.tx as string,
    },
    onCompleted: (data) => {
      handleSetState((prevState) => ({
        ...prevState,
        ...formatTransactionDetails(data),
      }));
    },
  });

  const getAssetsList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/${chainType.toLowerCase()}/assets.json`
      );

      handleSetState((prevState) => ({
        ...prevState,
        assets: response.data.assets,
        assetsLoading: false,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
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
        metadatas,
        metadataLoading: false,
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

  const onMessageFilterCallback = useCallback(
    (value: string) => {
      handleSetState((prevState) => ({
        ...prevState,
        messages: {
          filterBy: value,
          viewRaw: prevState.messages.viewRaw,
          items: prevState.messages.items,
        },
      }));
    },
    [handleSetState]
  );

  const toggleMessageDisplay = useCallback(
    (_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {
      handleSetState((prevState) => ({
        ...prevState,
        messages: {
          filterBy: prevState.messages.filterBy,
          viewRaw: checked,
          items: prevState.messages.items,
        },
      }));
    },
    [handleSetState]
  );

  const filterMessages = useCallback(
    (messages: unknown[]) =>
      messages.filter((x) => {
        if (state.messages.filterBy !== 'none') {
          return (x as { category: string }).category === state.messages.filterBy;
        }
        return true;
      }),
    [state.messages.filterBy]
  );

  return {
    state,
    onMessageFilterCallback,
    toggleMessageDisplay,
    filterMessages,
  };
};
