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
  const overview = {
    height: data.block[0].height,
    hash: data.block[0].hash,
    txs: data.block[0].txs ?? 0,
    timestamp: data.block[0].timestamp,
    proposer: proposerAddress,
  };
  return overview;
};

// ==========================
// Signatures
// ==========================
const formatSignatures = (data: BlockDetailsQuery) => {
  const signatures = data.preCommits
    .filter((x) => x?.validator?.validatorInfo)
    .map((x) => x?.validator?.validatorInfo?.operatorAddress ?? '');
  return signatures;
};

// ==========================
// Transactions
// ==========================
const formatSpenderAndReceiver = (messages: any[], transactionLogs: any[], denom: string) => {
  const attributes = transactionLogs?.[0]?.events.filter(
    (event: any) => event.attributes.length > 1
  );
  let sender = '-';

  if (messages?.length) {
    sender =
      messages.length === 1
        ? messages[0].sender ||
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
          messages[0].executor ||
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
    receiver,
    amount,
  };
};

const formatTransactions = (data: BlockDetailsQuery, stateChange: Partial<BlockDetailState>) => {
  const transactions = data.transaction.map((x) => {
    const { fee, logs, messages: txMessages } = x;

    const feeAmount = fee?.amount?.[0] ?? {
      denom: '',
      amount: 0,
    };
    const { sender, receiver, amount } = formatSpenderAndReceiver(
      txMessages,
      logs,
      feeAmount.denom
    );
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
