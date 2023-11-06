import * as R from 'ramda';
import { useState } from 'react';
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

const formatSpenderAndReceiver = (transactionLogs: any[], denom: string) => {
  const spentAttributes = transactionLogs?.[0].events.filter(
    (event: any) => event.type === 'coin_spent'
  );
  const receivedAttributes = transactionLogs?.[0].events.filter(
    (event: any) => event.type === 'coin_received'
  );

  if (!spentAttributes?.length && !receivedAttributes?.length) {
    return {
      spender: '',
      receiver: '',
      amount: '-',
    };
  }

  const spenderDataArr = spentAttributes.filter((event: any) => event.attributes.length === 2);
  const receiverDataArr = receivedAttributes.filter((event: any) => event.attributes.length === 2);

  const spenderAccountValue = spenderDataArr?.[0]?.attributes?.find(
    (item: any) => item.key === 'spender'
  );
  const receiverAccountValue = receiverDataArr?.[0]?.attributes?.find(
    (item: any) => item.key === 'receiver'
  );
  const spentAmount = spenderDataArr?.[0]?.attributes?.find(
    (item: any) => item.key === 'amount' && item.value.includes(denom)
  );
  const receivedAmount = receiverDataArr?.[0]?.attributes?.find(
    (item: any) => item.key === 'amount' && item.value.includes(denom)
  );

  return {
    spender: spenderAccountValue?.value || '',
    receiver: receiverAccountValue?.value || '',
    amount: spentAmount?.value || receivedAmount?.value || '',
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

    const { spender, receiver, amount } = formatSpenderAndReceiver(x.logs, feeAmount.denom);
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
      spender,
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
  });

  const handleSetState = (stateChange: (prevState: TransactionsState) => TransactionsState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  };

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
        loading: false,
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

  return {
    state,
    loadNextPage,
  };
};
