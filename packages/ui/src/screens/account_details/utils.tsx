import { useEffect, useMemo } from 'react';
import {
  useAccountBalancesQuery,
  useAccountCommissionQuery,
  useAccountDelegationBalanceQuery,
  useAccountDelegationRewardsQuery,
  useAddressRiskScoreQuery,
  useAccountUnbondingBalanceQuery,
  useAccountWithdrawalAddressQuery,
} from '@/graphql/types/general_types';
import { toValidatorAddress } from '@/utils/prefix_convert';
import { bech32 } from 'bech32';
import chainConfig from '@/chainConfig';

const {
  prefix: { account },
} = chainConfig();

export const validateAddress = (address: string) => {
  try {
    const decodedAddress = bech32.decode(address);
    const { prefix, words } = decodedAddress;

    if ((prefix && words.length === 32) || words.length === 52) {
      return { prefix, result: true };
    }
  } catch (error) {
    // Invalid address or decoding error
  }
  return { prefix: '', result: false };
};

export const useCommission = (address?: string) => {
  const { prefix, result } = validateAddress(address as string);
  /* Converting the address to a validator address. */
  let validatorAddress = '';
  try {
    if (address) validatorAddress = toValidatorAddress(address);
  } catch (e) {
    console.error(e);
  }

  const defaultReturnValue = useMemo(
    () => ({
      commission: {
        coins: [],
      },
    }),
    []
  );

  const { data, error, refetch } = useAccountCommissionQuery({
    variables: {
      validatorAddress,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);
  return data ?? defaultReturnValue;
};

export const useAccountWithdrawalAddress = (address?: string) => {
  const { prefix, result } = validateAddress(address as string);

  const defaultReturnValue = useMemo(
    () => ({
      withdrawalAddress: {
        address,
      },
    }),
    [address]
  );
  const { data, error, refetch } = useAccountWithdrawalAddressQuery({
    variables: {
      address: address ?? '',
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);

  return {
    address: data ?? defaultReturnValue,
    error,
  };
};

export const useAccountRiskActivity = (address?: string) => {
  const { data, error, refetch } = useAddressRiskScoreQuery({
    variables: {
      address: address ?? '',
    },
    skip: !address,
    onError: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);

  return {
    data,
  };
};

export const useAvailableBalances = (address?: string) => {
  const { prefix, result } = validateAddress(address as string);
  const defaultReturnValue = useMemo(
    () => ({
      accountBalances: {
        coins: [],
      },
    }),
    []
  );
  const { data, error, refetch } = useAccountBalancesQuery({
    variables: {
      address: address ?? '',
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);
  return data ?? defaultReturnValue;
};

export const useDelegationBalance = (address?: string) => {
  const { prefix, result } = validateAddress(address as string);
  const defaultReturnValue = useMemo(
    () => ({
      delegationBalance: {
        coins: [],
      },
    }),
    []
  );
  const { data, error, refetch } = useAccountDelegationBalanceQuery({
    variables: {
      address: address ?? '',
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);
  return data ?? defaultReturnValue;
};

export const useUnbondingBalance = (address?: string) => {
  const { prefix, result } = validateAddress(address as string);
  const defaultReturnValue = useMemo(
    () => ({
      unbondingBalance: {
        coins: [],
      },
    }),
    []
  );
  const { data, error, refetch } = useAccountUnbondingBalanceQuery({
    variables: {
      address: address ?? '',
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);
  return data ?? defaultReturnValue;
};

export const useRewards = (address?: string) => {
  const { prefix, result } = validateAddress(address as string);
  const defaultReturnValue = useMemo(() => ({ delegationRewards: [] }), []);
  const { data, error, refetch } = useAccountDelegationRewardsQuery({
    variables: {
      address: address ?? '',
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);
  return data ?? defaultReturnValue;
};
