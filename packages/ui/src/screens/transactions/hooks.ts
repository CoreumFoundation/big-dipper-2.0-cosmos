import * as R from 'ramda';
import { SyntheticEvent, useCallback, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import {
  TransactionsListenerSubscription,
  useTransactionsListenerSubscription,
  useTransactionsQuery,
} from '@/graphql/types/general_types';
import type { TransactionsState } from '@/screens/transactions/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';

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

const formatSpenderAndReceiver = (messages: any[], transactionLogs: any[], denom: string) => {
  const attributes = transactionLogs?.[0]?.events.filter(
    (event: any) => event.attributes.length > 1
  );
  let sender = '-';

  if (messages?.length) {
    sender =
      messages.length === 1
        ? messages[0].executor ||
          messages[0].from_address ||
          messages[0].issuer ||
          messages[0].grantee ||
          messages[0].granter ||
          messages[0].depositor ||
          messages[0].submitter ||
          messages[0].proposer ||
          messages[0].voter ||
          messages[0].delegator_address ||
          messages[0].admin ||
          messages[0].address ||
          messages[0].sender ||
          '-'
        : 'Multiple';
  }

  const receivers = attributes
    ?.map((e: any) => {
      const receiverItems = e.attributes.filter((attr: any) => attr.key === 'receiver');

      return receiverItems;
    })
    .filter((item: any) => item.length);

  let receiver = '-';

  if (receivers?.length) {
    receiver = receivers.length === 1 ? receivers[0][0].value : 'Multiple';
  }

  let amount = '';
  const coinReceivedEvents = attributes?.filter((item: any) => item.type === 'coin_received');

  if (coinReceivedEvents?.length === 1) {
    const amountAttribute = coinReceivedEvents[0].attributes.find(
      (item: any) => item.key === 'amount' && item.value?.includes(denom)
    );

    if (amountAttribute) {
      amount = amountAttribute.value;
    }
  }

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

    const { sender, receiver, amount } = formatSpenderAndReceiver(
      x.messages,
      x.logs,
      feeAmount.denom
    );

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
    bridgeHasNextPage: false,
    isBridgeNextPageLoading: true,
    tab: 0,
  });

  const handleSetState = (stateChange: (prevState: TransactionsState) => TransactionsState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  };

  const handleTabChange = useCallback(
    (_event: SyntheticEvent<Element, globalThis.Event>, newValue: number) => {
      setState((prevState) => ({
        ...prevState,
        tab: newValue,
      }));
    },
    []
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
        hasNextPage: itemsLength === 51,
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
          hasNextPage: itemsLength === 51,
        }));
      });
  };

  const loadBridgeNextPage = () => {
    // eslint-disable-next-line no-console
    console.log('load next bridge page');
  };

  return {
    state,
    loadNextPage,
    handleTabChange,
    loadBridgeNextPage,
  };
};
