import { useRouter } from 'next/router';
import numeral from 'numeral';
import * as R from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import { BlockDetailsQuery, useBlockDetailsQuery } from '@/graphql/types/general_types';
import type { BlockDetailState } from '@/screens/block_details/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';

export const useBlockDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<BlockDetailState>({
    loading: true,
    exists: true,
    overview: {
      height: 0,
      hash: '',
      txs: 0,
      timestamp: '',
      proposer: '',
      moniker: '',
    },
    signatures: [],
    transactions: [],
  });

  const handleSetState = useCallback(
    (stateChange: (prevState: BlockDetailState) => BlockDetailState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  // ==========================
  // Fetch Data
  // ==========================
  useBlockDetailsQuery({
    variables: {
      height: numeral(router.query.height).value(),
      signatureHeight: (numeral(router.query.height).value() ?? 0) + 1,
    },
    onCompleted: (data) => {
      handleSetState((prevState) => ({ ...prevState, ...formatRaws(data) }));
    },
  });

  useEffect(() => {
    // reset every call
    handleSetState((prevState) => ({
      ...prevState,
      loading: true,
      exists: true,
    }));
  }, [handleSetState]);

  return {
    state,
  };
};

// ==========================
// Overview
// ==========================
const formatOverview = (data: BlockDetailsQuery) => {
  const proposerAddress = data?.block?.[0]?.validator?.validatorInfo?.operatorAddress ?? '';
  const moniker = data?.block?.[0]?.validator?.validatorDescriptions?.[0]?.moniker ?? '';
  const avatarUrl = data?.block?.[0]?.validator?.validatorDescriptions?.[0]?.avatarUrl ?? '';

  const overview = {
    height: data.block[0].height,
    hash: data.block[0].hash,
    txs: data.block[0].txs ?? 0,
    timestamp: data.block[0].timestamp,
    proposer: proposerAddress,
    moniker,
    avatarUrl,
  };
  return overview;
};

// ==========================
// Signatures
// ==========================
const formatSignatures = (data: BlockDetailsQuery) => {
  const signatures = data.preCommits
    .filter((x) => x?.validator?.validatorInfo)
    .map((x) => ({
      address: x?.validator?.validatorInfo?.operatorAddress ?? '',
      moniker: x?.validator?.validatorDescriptions?.[0]?.moniker ?? '',
    }));
  return signatures;
};

// ==========================
// Transactions
// ==========================
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

const formatTransactions = (data: BlockDetailsQuery, stateChange: Partial<BlockDetailState>) => {
  const transactions = data.transaction.map((x) => {
    const { fee, logs } = x;

    const feeAmount = fee?.amount?.[0] ?? {
      denom: '',
      amount: 0,
    };
    const { sender, receiver, amount } = formatSpenderAndReceiver(logs, feeAmount.denom);
    const formatedAmount =
      amount !== '' && amount !== '-'
        ? formatToken(amount.replace(feeAmount.denom, ''), feeAmount.denom)
        : amount;

    const messages = convertMsgsToModels(x);
    const msgType = messages.map((eachMsg) => {
      const eachMsgType = eachMsg?.type ?? 'none type';
      return eachMsgType ?? '';
    });
    const convertedMsgType = convertMsgType(msgType);
    return {
      type: convertedMsgType,
      height: x.height,
      hash: x.hash,
      success: x.success,
      timestamp: stateChange.overview?.timestamp ?? '',
      messages: {
        count: x.messages.length,
        items: messages,
      },
      fee: formatToken(feeAmount.amount, feeAmount.denom),
      amount: formatedAmount,
      sender,
      receiver,
    };
  });

  return transactions;
};

function formatRaws(data: BlockDetailsQuery) {
  const stateChange: Partial<BlockDetailState> = {
    loading: false,
  };

  if (!data.block.length) {
    stateChange.exists = false;
    return stateChange;
  }

  stateChange.overview = formatOverview(data);
  stateChange.signatures = formatSignatures(data);
  stateChange.transactions = formatTransactions(data, stateChange);

  return stateChange;
}
