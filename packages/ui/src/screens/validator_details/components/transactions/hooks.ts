import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressQuery,
} from '@/graphql/types/general_types';
import type { TransactionState } from '@/screens/validator_details/components/transactions/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';

const LIMIT = 50;

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
    (item: any) => item.key === 'amount' && item.value?.includes(denom)
  );
  const receivedAmount = receiverDataArr?.[0]?.attributes?.find(
    (item: any) => item.key === 'amount' && item.value?.includes(denom)
  );

  return {
    spender: spenderAccountValue?.value || '',
    receiver: receiverAccountValue?.value || '',
    amount: spentAmount?.value || receivedAmount?.value || '',
  };
};

const formatTransactions = (data: GetMessagesByAddressQuery): Transactions[] => {
  let formattedData = data.messagesByAddress;
  if (data.messagesByAddress.length === 51) {
    formattedData = data.messagesByAddress.slice(0, 51);
  }
  return formattedData.map((x) => {
    const { transaction } = x;
    const { fee, logs } = transaction as any;
    const feeAmount = fee?.amount?.[0] ?? {
      denom: '',
      amount: 0,
    };

    const { spender, receiver, amount } = formatSpenderAndReceiver(logs, feeAmount.denom);
    const formatedAmount =
      amount !== '' && amount !== '-'
        ? formatToken(amount.replace(feeAmount.denom, ''), feeAmount.denom)
        : amount;

    // =============================
    // messages
    // =============================
    const messages = convertMsgsToModels(transaction);
    const msgType = messages.map((eachMsg) => {
      const eachMsgType = eachMsg?.type ?? 'none type';
      return eachMsgType ?? '';
    });
    const convertedMsgType = convertMsgType(msgType);
    return {
      height: transaction?.height,
      hash: transaction?.hash ?? '',
      type: convertedMsgType,
      messages: {
        count: messages.length,
        items: messages,
      },
      success: transaction?.success ?? false,
      timestamp: transaction?.block.timestamp,
      fee: formatToken(feeAmount.amount, feeAmount.denom),
      amount: formatedAmount,
      spender,
      receiver,
    };
  });
};

export function useTransactions() {
  const router = useRouter();
  const [state, setState] = useState<TransactionState>({
    data: [],
    hasNextPage: false,
    isNextPageLoading: true,
    offsetCount: 0,
  });

  const handleSetState = (stateChange: (prevState: TransactionState) => TransactionState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  };

  const transactionQuery = useGetMessagesByAddressQuery({
    variables: {
      limit: LIMIT + 1, // to check if more exist
      offset: 0,
      address: `{${router?.query?.address ?? ''}}`,
    },
    onCompleted: (data) => {
      const itemsLength = data.messagesByAddress.length;
      const newItems = R.uniq([...state.data, ...formatTransactions(data)]);
      const stateChange: TransactionState = {
        data: newItems,
        hasNextPage: itemsLength === 51,
        isNextPageLoading: false,
        offsetCount: state.offsetCount + LIMIT,
      };

      handleSetState((prevState) => ({ ...prevState, ...stateChange }));
    },
  });

  const loadNextPage = async () => {
    handleSetState((prevState) => ({ ...prevState, isNextPageLoading: true }));
    // refetch query
    await transactionQuery
      .fetchMore({
        variables: {
          offset: state.offsetCount,
          limit: LIMIT + 1,
        },
      })
      .then(({ data }) => {
        const itemsLength = data.messagesByAddress.length;
        const newItems = R.uniq([...state.data, ...formatTransactions(data)]);
        const stateChange: TransactionState = {
          data: newItems,
          hasNextPage: itemsLength === 51,
          isNextPageLoading: false,
          offsetCount: state.offsetCount + LIMIT,
        };
        handleSetState((prevState) => ({ ...prevState, ...stateChange }));
      });
  };

  return {
    state,
    loadNextPage,
  };
}
