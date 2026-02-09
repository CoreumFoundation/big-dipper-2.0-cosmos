import numeral from 'numeral';
import * as R from 'ramda';
import { useCallback, useState } from 'react';
import chainConfig from '@/chainConfig';
import {
  ParamsQuery,
  useParamsQuery,
  usePseParamsQuery,
  PseParamsQuery,
  useLatestBlockHeightListenerSubscription,
} from '@/graphql/types/general_types';
import {
  DistributionParams,
  GovParams,
  MintParams,
  SlashingParams,
  StakingParams,
  FeeModelParams,
  TokenParams,
} from '@/models';
import { customStakingParams } from '@/models/staking_params';
import type { Auth, Dex, Pse, ParamsState } from '@/screens/params/types';
import { formatToken } from '@/utils/format_token';
import AuthParams from '@/models/auth_params';
import DexParams from '@/models/dex_params';

const { primaryTokenUnit } = chainConfig();

const initialState: ParamsState = {
  loading: true,
  exists: true,
  staking: null,
  slashing: null,
  minting: null,
  distribution: null,
  gov: null,
  feeModel: null,
  nft: null,
  ft: null,
  auth: null,
  dex: null,
  pse: null,
};

// ================================
// staking
// ================================
const formatStaking = (data: ParamsQuery) => {
  if (data.stakingParams.length) {
    const stakingParamsRaw = StakingParams.fromJson(data?.stakingParams?.[0]?.params ?? {});
    const customStakingParamsRaw = customStakingParams.fromJson(
      data?.customParams?.[0]?.customStakingParams ?? {}
    );
    return {
      bondDenom: stakingParamsRaw.bondDenom,
      unbondingTime: stakingParamsRaw.unbondingTime,
      maxEntries: stakingParamsRaw.maxEntries,
      historicalEntries: stakingParamsRaw.historicalEntries,
      maxValidators: stakingParamsRaw.maxValidators,
      minSelfDelegation: formatToken(
        customStakingParamsRaw.minSelfDelegation,
        stakingParamsRaw.bondDenom
      ),
    };
  }

  return null;
};

// ================================
// slashing
// ================================
const formatSlashing = (data: ParamsQuery) => {
  if (data.slashingParams.length) {
    const slashingParamsRaw = SlashingParams.fromJson(data?.slashingParams?.[0]?.params ?? {});
    return {
      downtimeJailDuration: slashingParamsRaw.downtimeJailDuration,
      minSignedPerWindow: slashingParamsRaw.minSignedPerWindow,
      signedBlockWindow: slashingParamsRaw.signedBlockWindow,
      slashFractionDoubleSign: slashingParamsRaw.slashFractionDoubleSign,
      slashFractionDowntime: slashingParamsRaw.slashFractionDowntime,
    };
  }
  return null;
};

// ================================
// minting
// ================================
const formatMint = (data: ParamsQuery) => {
  if (data.mintParams.length) {
    const mintParamsRaw = MintParams.fromJson(data?.mintParams?.[0]?.params ?? {});

    return {
      blocksPerYear: mintParamsRaw.blocksPerYear,
      goalBonded: mintParamsRaw.goalBonded,
      inflationMax: mintParamsRaw.inflationMax,
      inflationMin: mintParamsRaw.inflationMin,
      inflationRateChange: mintParamsRaw.inflationRateChange,
      mintDenom: mintParamsRaw.mintDenom,
    };
  }

  return null;
};

// ================================
// distribution
// ================================

const formatDistribution = (data: ParamsQuery) => {
  if (data.distributionParams.length) {
    const distributionParamsRaw = DistributionParams.fromJson(
      data?.distributionParams?.[0]?.params ?? {}
    );
    return {
      baseProposerReward: distributionParamsRaw.baseProposerReward,
      bonusProposerReward: distributionParamsRaw.bonusProposerReward,
      communityTax: distributionParamsRaw.communityTax,
      withdrawAddressEnabled: distributionParamsRaw.withdrawAddressEnabled,
    };
  }

  return null;
};

// ================================
// distribution
// ================================

const formatGov = (data: ParamsQuery) => {
  if (data.govParams.length) {
    const govParamsRaw = GovParams.fromJson(data?.govParams?.[0]?.params ?? {});

    return {
      minDeposit: formatToken(
        govParamsRaw.depositParams.minDeposit?.[0]?.amount ?? 0,
        govParamsRaw.depositParams.minDeposit?.[0]?.denom ?? primaryTokenUnit
      ),
      maxDepositPeriod: govParamsRaw.depositParams.maxDepositPeriod,
      quorum: numeral(numeral(govParamsRaw.tallyParams.quorum).format('0.[00]')).value() ?? 0,
      threshold: numeral(numeral(govParamsRaw.tallyParams.threshold).format('0.[00]')).value() ?? 0,
      vetoThreshold:
        numeral(numeral(govParamsRaw.tallyParams.vetoThreshold).format('0.[00]')).value() ?? 0,
      votingPeriod: govParamsRaw.votingParams.votingPeriod,
    };
  }

  return null;
};

// ================================
// fee model params
// ================================
const formatFeeModel = (data: ParamsQuery) => {
  if (data.feeModelParams?.length) {
    const feeModelParamsRaw = FeeModelParams.fromJson(data?.feeModelParams?.[0].params.model ?? {});

    return {
      maxDiscount: feeModelParamsRaw.maxDiscount,
      maxBlockGas: feeModelParamsRaw.maxBlockGas,
      initialGasPrice: feeModelParamsRaw.initialGasPrice,
      longEmaBlockLength: feeModelParamsRaw.longEmaBlockLength,
      shortEmaBlockLength: feeModelParamsRaw.shortEmaBlockLength,
      maxGasPriceMultiplier: feeModelParamsRaw.maxGasPriceMultiplier,
      escalationStartFraction: feeModelParamsRaw.escalationStartFraction,
    };
  }

  return null;
};

// ================================
// token params
// ================================

const formatNFTParams = (data: ParamsQuery) => {
  if (data.nftParams?.length) {
    const nftParamsRaw = TokenParams.fromJson(data.nftParams?.[0]?.params ?? {});
    return {
      nftMintFee: formatToken(
        nftParamsRaw.nftMintFee.amount ?? '',
        nftParamsRaw.nftMintFee.denom ?? ''
      ),
    };
  }
  return null;
};

const formatFTParams = (data: ParamsQuery) => {
  if (data.ftParams?.length) {
    const ftParamsRaw = TokenParams.fromJson(data.ftParams?.[0]?.params ?? {});
    if (
      ftParamsRaw.tokenUpgradeDecisionTimeout &&
      ftParamsRaw.tokenUpgradeGracePeriod !== undefined
    ) {
      return {
        ftIssueFee: formatToken(
          ftParamsRaw.ftIssueFee.amount ?? '',
          ftParamsRaw.ftIssueFee.denom ?? ''
        ),
        tokenUpgradeGracePeriod: ftParamsRaw.tokenUpgradeGracePeriod,
        tokenUpgradeDecisionTimeout: ftParamsRaw.tokenUpgradeDecisionTimeout,
      };
    }
    return {
      ftIssueFee: formatToken(
        ftParamsRaw.ftIssueFee.amount ?? '',
        ftParamsRaw.ftIssueFee.denom ?? ''
      ),
    };
  }
  return null;
};

const formatAuthParams = (data: ParamsQuery): Auth | null => {
  if (data.authParams?.length) {
    return AuthParams.fromJson(data.authParams?.[0]?.params ?? {});
  }

  return null;
};

const formatDEXParams = (data: ParamsQuery): Dex | null => {
  if (data.dexParams?.length) {
    return DexParams.fromJson(data.dexParams?.[0]?.params ?? {});
  }

  return null;
};

const formatPseParams = (data: PseParamsQuery): Pse | null => {
  const { pse_params } = data;
  if (pse_params?.params) {
    const { params } = pse_params;
    return {
      clearing_account_mappings: (params.clearing_account_mappings ?? []).map((mapping) => ({
        clearing_account: mapping?.clearing_account ?? '',
        recipient_addresses: mapping?.recipient_addresses ?? [],
      })),
      excluded_addresses: params.excluded_addresses ?? null,
    };
  }

  return null;
};

const formatParam = (data: ParamsQuery) => {
  const results: Partial<ParamsState> = {};

  results.staking = formatStaking(data);

  results.slashing = formatSlashing(data);

  results.minting = formatMint(data);

  results.distribution = formatDistribution(data);

  results.gov = formatGov(data);

  results.feeModel = formatFeeModel(data);

  results.nft = formatNFTParams(data);

  results.ft = formatFTParams(data);

  results.auth = formatAuthParams(data);

  results.dex = formatDEXParams(data);

  return results;
};

export const useParams = () => {
  const [state, setState] = useState<ParamsState>(initialState);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  const handleSetState = useCallback((stateChange: (prevState: ParamsState) => ParamsState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  // ================================
  // block height subscription
  // ================================
  useLatestBlockHeightListenerSubscription({
    onData: (data) => {
      const height = data.data.data?.height?.[0]?.height ?? null;
      if (height !== null) {
        setBlockHeight(height);
      }
    },
  });

  // ================================
  // param query
  // ================================
  useParamsQuery({
    onCompleted: (data) => {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        ...formatParam(data),
      }));
    },
    onError: () => {
      handleSetState((prevState) => ({ ...prevState, loading: false }));
    },
  });

  // ================================
  // PSE params query
  // ================================
  usePseParamsQuery({
    variables: {
      height: blockHeight ?? undefined,
    },
    skip: !blockHeight,
    onCompleted: (data) => {
      const pseParams = formatPseParams(data);
      handleSetState((prevState) => ({
        ...prevState,
        pse: pseParams,
      }));
    },
    onError: () => {
      handleSetState((prevState) => ({ ...prevState, pse: null }));
    },
  });

  return {
    state,
  };
};
