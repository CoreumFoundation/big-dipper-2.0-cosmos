import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressQuery,
} from '@/graphql/types/general_types';
import type { TransactionState } from '@/screens/validator_details/components/transactions/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';

const LIMIT = 50;

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

const getSender = (msgIndexEvents: any[]) => {
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

const getReceiver = (msgIndexEvents: any[]) => {
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

const getAmount = (msgIndexEvents: any[], denom: string) => {
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

  const msgIndexEvents = getMsgIndexEvents(transactionLogsEvents);
  const sender = getSender(msgIndexEvents);
  const receiver = getReceiver(msgIndexEvents);
  const amount = getAmount(msgIndexEvents, denom);

  return {
    sender,
    receiver: receiver.replaceAll('"', ''),
    amount,
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

    const { sender, receiver, amount } = formatSpenderAndReceiver(logs, feeAmount.denom);
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
      sender,
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

  useEffect(() => {
    setState({
      data: [],
      hasNextPage: false,
      isNextPageLoading: true,
      offsetCount: 0,
    });
  }, [router?.query?.address]);

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
