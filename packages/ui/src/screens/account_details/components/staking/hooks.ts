import Big from 'big.js';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import * as R from 'ramda';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import chainConfig from '@/chainConfig';
import {
  useAccountDelegationsQuery,
  useAccountRedelegationsQuery,
  useAccountUndelegationsQuery,
  useValidatorsQuery,
  ValidatorsQuery,
} from '@/graphql/types/general_types';
import type {
  DelegationType,
  RedelegationType,
  StakingState,
} from '@/screens/account_details/components/staking/types';
import type { RewardsType } from '@/screens/account_details/types';
import { ValidatorType } from '@/screens/validators/components/list/types';
import { formatToken } from '@/utils/format_token';
import { getDenom } from '@/utils/get_denom';
import { validateAddress } from '../../utils';

const {
  primaryTokenUnit,
  prefix: { account },
} = chainConfig();

export const ROWS_PER_PAGE = 10;

export const formatDelegations = (
  data: Array<{
    validator_address?: string;
    coins?: MsgCoin[];
  }>,
  validatorsCommission: Pick<ValidatorType, 'validator' | 'commission' | 'overview'>[],
  rewards: RewardsType
) =>
  data
    .map((x): DelegationType => {
      const validator = x?.validator_address ?? '';
      const delegation = getDenom(x.coins, primaryTokenUnit);
      return {
        validator,
        commission:
          numeral(
            validatorsCommission.find((val) => val.validator === validator)?.commission?.toFixed(3)
          ).value() ?? 0,
        amount: formatToken(delegation.amount, delegation.denom),
        reward: rewards[validator],
        overview: validatorsCommission.find((val) => val.validator === validator)?.overview,
      };
    })
    .sort((a, b) => (Big(a.amount?.value).gt(b.amount?.value) ? -1 : 1));

export const formatRedelegations = (
  data: Array<{
    entries?: Array<{ balance: string | number; completion_time?: string }>;
    validator_src_address?: string;
    validator_dst_address?: string;
  }>,
  validatorsCommission: Pick<ValidatorType, 'validator' | 'commission' | 'overview'>[]
) => {
  const results: RedelegationType[] = [];
  data.forEach((x) => {
    x.entries?.forEach((y) => {
      const validatorFrom = x?.validator_src_address ?? '';
      const validatorTo = x?.validator_dst_address ?? '';

      results.push({
        from: x?.validator_src_address ?? '',
        to: x?.validator_dst_address ?? '',
        amount: formatToken(y.balance, primaryTokenUnit),
        completionTime: y?.completion_time ?? '',
        overviewFrom: validatorsCommission.find((val) => val.validator === validatorFrom)?.overview,
        overviewTo: validatorsCommission.find((val) => val.validator === validatorTo)?.overview,
      });
    });
  });

  results.sort((a, b) => (a.completionTime < b.completionTime ? -1 : 1));

  return results;
};

export const formatUnbondings = (
  data: Array<{
    entries?: Array<{ balance: string | number; completion_time?: string }>;
    validator_address?: string;
  }>,
  validatorsCommission: Pick<ValidatorType, 'validator' | 'commission' | 'overview'>[]
) => {
  const results: Array<{
    validator: string;
    amount: TokenUnit;
    completionTime: string;
    overview?: { moniker?: string; avatarUrl?: string };
  }> = [];
  data.forEach((x) => {
    x?.entries?.forEach((y) => {
      const validator = x?.validator_address ?? '';

      results.push({
        validator: x?.validator_address ?? '',
        amount: formatToken(y.balance, primaryTokenUnit),
        completionTime: y?.completion_time ?? '',
        overview: validatorsCommission.find((val) => val.validator === validator)?.overview,
      });
    });
  });

  results.sort((a, b) => (a.completionTime < b.completionTime ? -1 : 1));

  return results;
};

export const useStaking = (
  rewards: RewardsType,
  delegationsPage: number,
  redelegationsPage: number,
  unbondingsPage: number
) => {
  const router = useRouter();
  const [state, setState] = useState<StakingState>({
    tab: 0,
  });

  const [validatorsCommission, setValidatorsCommission] = useState<
    Pick<ValidatorType, 'validator' | 'commission' | 'overview'>[]
  >([]);

  // ==========================
  // Fetch Data
  // ==========================
  useValidatorsQuery({
    onCompleted: (data) => {
      formatValidators(data);
    },
  });

  // return a list of all validators with their address and commission rate
  const formatValidators = useCallback(
    (data: ValidatorsQuery): { items: Pick<ValidatorType, 'validator' | 'commission'>[] } => {
      const formattedItems: Pick<ValidatorType, 'validator' | 'commission'>[] = data.validator
        .filter((x) => x.validatorInfo)
        .map((x) => ({
          validator: x.validatorInfo?.operatorAddress ?? '',
          commission: (x?.validatorCommissions?.[0]?.commission ?? 0) * 100,
          overview: {
            moniker: x?.validatorDescriptions?.[0]?.moniker ?? '',
            avatarUrl: x?.validatorDescriptions?.[0]?.avatarUrl ?? '',
          },
        }));

      setValidatorsCommission(formattedItems);

      return {
        items: formattedItems,
      };
    },
    []
  );

  const address = Array.isArray(router?.query?.address)
    ? router.query.address[0]
    : (router?.query?.address ?? '');
  const { prefix, result } = validateAddress(address as string);

  // =====================================
  // delegations
  // =====================================
  const {
    data: delegationsData,
    loading: delegationsLoading,
    error: delegationsError,
    refetch: delegationsRefetch,
  } = useAccountDelegationsQuery({
    variables: {
      address,
      limit: ROWS_PER_PAGE,
      offset: delegationsPage * ROWS_PER_PAGE,
      pagination: true,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      delegationsRefetch({
        address,
        limit: ROWS_PER_PAGE,
        offset: delegationsPage * ROWS_PER_PAGE,
        pagination: false,
      });
    },
  });

  useEffect(() => {
    if (delegationsLoading) return;
    if (delegationsError) {
      delegationsRefetch({ pagination: false });
    }
  }, [delegationsData, delegationsError, delegationsLoading, delegationsRefetch]);

  useAccountDelegationsQuery({
    variables: {
      address,
      limit: ROWS_PER_PAGE,
      offset: (delegationsPage + 1) * ROWS_PER_PAGE,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      delegationsRefetch();
    },
  });

  const [delegationsPagination, setDelegationsPagination] = useState<number | undefined>();
  const {
    data: dData,
    error: dError,
    refetch: dRefetch,
  } = useAccountDelegationsQuery({
    variables: {
      address,
      limit: 0,
      offset: 0,
      pagination: true,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      dRefetch();
    },
  });
  useEffect(() => {
    if (dError) {
      dRefetch();
    } else if (dData) {
      setDelegationsPagination(dData?.delegations?.pagination?.total ?? 0);
    }
  }, [dData, dError, dRefetch]);

  // =====================================
  // redelegations
  // =====================================
  const {
    data: redelegationsData,
    loading: redelegationsLoading,
    error: redelegationsError,
    refetch: redelegationsRefetch,
  } = useAccountRedelegationsQuery({
    variables: {
      address,
      limit: ROWS_PER_PAGE,
      offset: redelegationsPage * ROWS_PER_PAGE,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      redelegationsRefetch({
        address,
        limit: ROWS_PER_PAGE,
        offset: redelegationsPage * ROWS_PER_PAGE,
        pagination: false,
      });
    },
  });
  useEffect(() => {
    if (redelegationsLoading) return;
    if (redelegationsError) {
      redelegationsRefetch({ pagination: false });
    }
  }, [redelegationsError, redelegationsLoading, redelegationsRefetch]);

  useAccountRedelegationsQuery({
    variables: {
      address,
      limit: ROWS_PER_PAGE,
      offset: (redelegationsPage + 1) * ROWS_PER_PAGE,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      redelegationsRefetch({
        address,
        limit: ROWS_PER_PAGE,
        offset: (redelegationsPage + 1) * ROWS_PER_PAGE,
        pagination: false,
      });
    },
  });

  const [redelegationsPagination, setRedelegationsPagination] = useState<number | undefined>();
  const {
    data: rData,
    error: rError,
    refetch: rRefetch,
  } = useAccountRedelegationsQuery({
    variables: {
      address,
      limit: 0,
      offset: 0,
      pagination: true,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      rRefetch();
    },
  });
  useEffect(() => {
    if (rError) {
      rRefetch();
    } else if (rData) {
      setRedelegationsPagination(rData?.redelegations?.pagination?.total ?? 0);
    }
  }, [rData, rError, rRefetch]);

  // =====================================
  // unbondings
  // =====================================
  const {
    data: undelegationsData,
    loading: undelegationsLoading,
    error: undelegationsError,
    refetch: undelegationsRefetch,
  } = useAccountUndelegationsQuery({
    variables: {
      address,
      limit: ROWS_PER_PAGE,
      offset: unbondingsPage * ROWS_PER_PAGE,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      undelegationsRefetch({
        address,
        limit: ROWS_PER_PAGE,
        offset: unbondingsPage * ROWS_PER_PAGE,
        pagination: false,
      });
    },
  });
  useEffect(() => {
    if (undelegationsLoading) return;
    if (undelegationsError) {
      undelegationsRefetch({ pagination: false });
    }
  }, [undelegationsError, undelegationsLoading, undelegationsRefetch]);
  useAccountUndelegationsQuery({
    variables: {
      address,
      limit: ROWS_PER_PAGE,
      offset: (unbondingsPage + 1) * ROWS_PER_PAGE,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      undelegationsRefetch({
        address,
        limit: ROWS_PER_PAGE,
        offset: unbondingsPage * ROWS_PER_PAGE,
        pagination: false,
      });
    },
  });

  const [undelegationsPagination, setUndelegationsPagination] = useState<number | undefined>();
  const {
    data: uData,
    error: uError,
    refetch: uRefetch,
  } = useAccountUndelegationsQuery({
    variables: {
      address,
      limit: 0,
      offset: 0,
      pagination: true,
    },
    skip: !address || prefix !== account || !result,
    onError: () => {
      uRefetch();
    },
  });
  useEffect(() => {
    if (uError) {
      uRefetch();
    } else if (uData) {
      setUndelegationsPagination(uData?.undelegations?.pagination?.total ?? 0);
    }
  }, [uData, uError, uRefetch]);

  const handleTabChange = useCallback(
    (_event: SyntheticEvent<Element, globalThis.Event>, newValue: number) => {
      setState((prevState) => {
        const newState = { ...prevState, tab: newValue };
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  return {
    state,
    delegations: {
      loading: delegationsLoading,
      count: delegationsPagination,
      data: formatDelegations(
        delegationsData?.delegations?.delegations ?? [],
        validatorsCommission,
        rewards
      ),
      error: delegationsError,
    },
    redelegations: {
      loading: redelegationsLoading,
      count: redelegationsPagination,
      data: formatRedelegations(
        redelegationsData?.redelegations?.redelegations ?? [],
        validatorsCommission
      ),
      error: redelegationsError,
    },
    unbondings: {
      loading: undelegationsLoading,
      count: undelegationsPagination,
      data: formatUnbondings(
        undelegationsData?.undelegations?.undelegations ?? [],
        validatorsCommission
      ),
      error: undelegationsError,
    },
    handleTabChange,
  };
};
