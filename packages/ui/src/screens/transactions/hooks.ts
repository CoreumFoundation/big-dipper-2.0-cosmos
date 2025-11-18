/* eslint-disable no-nested-ternary */
import * as R from 'ramda';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import {
  TransactionsListenerSubscription,
  useTransactionsListenerSubscription,
  useTransactionsQuery,
} from '@/graphql/types/general_types';
import type { TransactionsState } from '@/screens/transactions/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';
import axios from 'axios';
import chainConfig from '@/chainConfig';
import { useRouter } from 'next/router';

const { chainType } = chainConfig();

// This is a bandaid as it can get extremely
// expensive if there is too much data
/**
 * Helps remove any possible duplication
 * and sorts by height in case it bugs out
 */
const uniqueAndSort = R.pipe(
  R.uniqBy((r: Transactions) => r?.hash),
  R.sort(R.descend((r) => r?.height))
);

const getMsgIndexEvents = (transactionLogsEvents: any[]) =>
  transactionLogsEvents
    .map((item: { attributes: { key: string; value: string }[]; type: string }) => {
      const msgIndexAttr = item.attributes.find(
        (attr: { key: string; value: string }) => attr.key === 'msg_index'
      );

      if (msgIndexAttr) {
        return item;
      }

      return undefined;
    })
    .filter((item) => item !== undefined);

const getSender = (
  msgIndexEvents: { attributes: { key: string; value: string }[]; type: string }[]
) => {
  const sendersResult = Array.from(
    new Set(
      msgIndexEvents
        .map((item: { attributes: { key: string; value: string }[]; type: string }) => {
          const msgIndexAttr = item.attributes.find(
            (attr: { key: string; value: string }) => attr.key === 'sender'
          );

          return msgIndexAttr?.value;
        })
        .filter((item): item is string => item !== undefined)
    )
  );

  if (sendersResult.length > 1) {
    return 'Multiple';
  }

  if (!sendersResult.length) {
    return '-';
  }

  return sendersResult[0];
};

const getReceiver = (
  msgIndexEvents: { attributes: { key: string; value: string }[]; type: string }[]
) => {
  const receiversResult = Array.from(
    new Set(
      msgIndexEvents
        .map((item: { attributes: { key: string; value: string }[]; type: string }) => {
          const msgIndexAttr = item.attributes.find(
            (attr: { key: string; value: string }) =>
              attr.key === 'recipient' || attr.key === 'receiver'
          );

          return msgIndexAttr?.value;
        })
        .filter((item): item is string => item !== undefined)
    )
  );

  if (receiversResult.length > 1) {
    return 'Multiple';
  }

  if (!receiversResult.length) {
    return '-';
  }

  return receiversResult[0];
};

const getAmount = (
  msgIndexEvents: { attributes: { key: string; value: string }[]; type: string }[],
  denom: string
) => {
  const transferEvents = msgIndexEvents.filter(
    (item: { attributes: { key: string; value: string }[]; type: string }) =>
      item.type === 'transfer'
  );

  if (!transferEvents.length) {
    return '-';
  }

  let amount = 0;
  let isSingleDenom = true;
  transferEvents.forEach(
    (event: { attributes: { key: string; value: string }[]; type: string }) => {
      const amountItem = event.attributes.find(
        (attr: { key: string; value: string }) => attr.key === 'amount'
      );

      if (amountItem) {
        const amountParsed = amountItem.value.split(denom);
        const amountValue = amountParsed[0];
        const amountDenom = amountItem.value.split(amountValue)[1];

        if (isSingleDenom) {
          if (amountDenom.toLowerCase() !== denom.toLowerCase()) {
            isSingleDenom = false;
          } else {
            amount += parseInt(amountValue, 10);
          }
        }
      }
    }
  );

  if (!isSingleDenom) {
    return '';
  }

  return `${String(amount)}${denom}`;
};

const formatSpenderAndReceiver = (transactionLogs: any[], denom: string) => {
  const transactionLogsEvents = transactionLogs?.[0]?.events || [];

  const msgIndexEvents = getMsgIndexEvents(transactionLogsEvents) as {
    attributes: { key: string; value: string }[];
    type: string;
  }[];
  const sender = getSender(msgIndexEvents);
  const receiver = getReceiver(msgIndexEvents);
  const amount = getAmount(msgIndexEvents, denom);

  return {
    sender,
    receiver: receiver.replaceAll('"', ''),
    amount,
  };
};

const formatTransactions = (data: TransactionsListenerSubscription): TransactionsState['items'] => {
  let formattedData = data.transactions;
  if (data.transactions.length === 51) {
    formattedData = data.transactions.slice(0, 51);
  }

  return formattedData.map((x) => {
    const { fee } = x;
    const feeAmount = fee?.amount?.[0] ?? {
      denom: '',
      amount: 0,
    };

    const { sender, receiver, amount } = formatSpenderAndReceiver(x.logs, feeAmount.denom);

    const formatedAmount =
      amount !== '' && amount !== '-'
        ? formatToken(amount.replace(feeAmount.denom, ''), feeAmount.denom)
        : amount;

    const messages = convertMsgsToModels(x);
    const msgType =
      x.messages?.map((eachMsg: unknown) => {
        const eachMsgType = R.pathOr('none type', ['@type'], eachMsg);
        return eachMsgType ?? '';
      }) ?? [];

    const convertedMsgType = convertMsgType(msgType);

    return {
      height: x.height,
      hash: x.hash,
      type: convertedMsgType,
      fee: formatToken(feeAmount.amount, feeAmount.denom),
      amount: formatedAmount,
      sender,
      receiver,
      messages: {
        count: x.messages.length,
        items: messages,
      },
      success: x.success,
      timestamp: x.block.timestamp,
    };
  });
};

export const useTransactions = () => {
  const [state, setState] = useState<TransactionsState>({
    loading: true,
    exists: true,
    hasNextPage: false,
    isNextPageLoading: true,
    items: [],
    bridgeItems: [],
    coreumXrplTransactions: [],
    xrplCoreumTransactions: [],
    bridgeLoading: true,
    isAllBridgeItemsFetched: false,
    bridgeHasNextPage: false,
    isBridgeNextPageLoading: true,
    tab: 0,
    assets: [],
    metadatas: [],
    assetsLoading: true,
    metadataLoading: true,
    xrplCoreumPage: 0,
  });
  const router = useRouter();

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

  const handleSetState = (stateChange: (prevState: TransactionsState) => TransactionsState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  };

  const handleTabChange = useCallback(
    (_event: SyntheticEvent<Element, globalThis.Event>, newValue: number) => {
      if (newValue === 1) {
        router.push('/transactions_bridge');
      }
    },
    [router]
  );

  // ================================
  // tx subscription
  // ================================
  useTransactionsListenerSubscription({
    variables: {
      limit: 1,
      offset: 0,
    },
    onData: (data) => {
      const newItems = uniqueAndSort([
        ...(data.data.data ? formatTransactions(data.data.data) : []),
        ...state.items,
      ]);
      handleSetState((prevState) => ({
        ...prevState,
        items: newItems,
      }));
    },
  });

  // ================================
  // tx query
  // ================================
  const LIMIT = 51;
  const transactionQuery = useTransactionsQuery({
    variables: {
      limit: LIMIT,
      offset: 1,
    },
    onError: () => {
      handleSetState((prevState) => ({ ...prevState, loading: false }));
    },
    onCompleted: (data) => {
      const itemsLength = data.transactions.length;
      const newItems = uniqueAndSort([...state.items, ...formatTransactions(data)]);
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        items: newItems,
        hasNextPage: itemsLength === LIMIT,
        isNextPageLoading: false,
      }));
    },
  });

  const loadNextPage = async () => {
    handleSetState((prevState) => ({ ...prevState, isNextPageLoading: true }));
    // refetch query
    await transactionQuery
      .fetchMore({
        variables: {
          offset: state.items.length,
          limit: LIMIT,
        },
      })
      .then(({ data }) => {
        const itemsLength = data.transactions.length;
        const newItems = uniqueAndSort([
          ...state.items,
          ...formatTransactions(data),
        ]) as TransactionsState['items'];
        // set new state
        handleSetState((prevState) => ({
          ...prevState,
          items: newItems,
          isNextPageLoading: false,
          hasNextPage: itemsLength === LIMIT,
        }));
      });
  };

  return {
    state,
    loadNextPage,
    handleTabChange,
  };
};
