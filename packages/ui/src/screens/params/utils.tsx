import Link from 'next/link';
import React, { type ReactNode } from 'react';
import type {
  Distribution,
  Gov,
  Minting,
  Slashing,
  Staking,
  FeeModel,
  NFT,
  FT,
  Auth,
  Dex,
  Pse,
} from '@/screens/params/types';
import { formatNumber, formatToken } from '@/utils/format_token';
import { nanoToSeconds, secondsToDays } from '@/utils/time';
import { ACCOUNT_DETAILS } from '@/utils/go_to_page';
import { TFunction } from 'next-i18next';
import numeral from 'numeral';

const convertBySeconds = (seconds: number, t: TFunction) => {
  const SECONDS_IN_DAY = 86400;
  return seconds >= SECONDS_IN_DAY
    ? t('days', {
        day: secondsToDays(seconds),
      })
    : t('seconds', {
        second: seconds,
      });
};

export const formatStaking = (data: Staking, t: TFunction) => [
  {
    key: 'bondDenom',
    label: t('bondDenom'),
    detail: data.bondDenom,
  },
  {
    key: 'unbondingTime',
    label: t('unbondingTime'),
    detail: convertBySeconds(nanoToSeconds(data.unbondingTime), t),
  },
  {
    key: 'maxEntries',
    label: t('maxEntries'),
    detail: numeral(data.maxEntries).format('0,0'),
  },
  {
    key: 'historicalEntries',
    label: t('historicalEntries'),
    detail: numeral(data.historicalEntries).format('0,0'),
  },
  {
    key: 'maxValidators',
    label: t('maxValidators'),
    detail: numeral(data.maxValidators).format('0,0'),
  },
  // commented out until backend is updated
  {
    key: 'minSelfDelegation',
    label: t('minSelfDelegation'),
    // Kept the "toUpperCase()" in order to show the token symbol in uppercase
    detail: `${numeral(data.minSelfDelegation.value).format(
      '0,0'
    )} ${data.minSelfDelegation.displayDenom.toUpperCase()}`,
  },
];

export const formatSlashing = (data: Slashing, t: TFunction) => [
  {
    key: 'downtimeJailDuration',
    label: t('downtimeJailDuration'),
    detail: t('seconds', {
      second: numeral(nanoToSeconds(data.downtimeJailDuration)).format('0,0'),
    }),
  },
  {
    key: 'minSignedPerWindow',
    label: t('minSignedPerWindow'),
    detail: `${numeral(data.minSignedPerWindow * 100).format('0.[00]')}%`,
  },
  {
    key: 'signedBlockWindow',
    label: t('signedBlockWindow'),
    detail: numeral(data.signedBlockWindow).format('0,0'),
  },
  {
    key: 'slashFractionDoubleSign',
    label: t('slashFractionDoubleSign'),
    detail: `${data.slashFractionDoubleSign * 100} / 100`,
  },
  {
    key: 'slashFractionDowntime',
    label: t('slashFractionDowntime'),
    detail: `${data.slashFractionDowntime * 10000} / ${numeral(10000).format('0,0')}`,
  },
];

export const formatMinting = (data: Minting, t: TFunction) => [
  {
    key: 'blocksPerYear',
    label: t('blocksPerYear'),
    detail: numeral(data.blocksPerYear).format('0,0'),
  },
  {
    key: 'goalBonded',
    label: t('goalBonded'),
    detail: `${numeral(data.goalBonded * 100).format('0.[00]')}%`,
  },
  {
    key: 'inflationMax',
    label: t('inflationMax'),
    detail: `${numeral(data.inflationMax * 100).format('0.[00]')}%`,
  },
  {
    key: 'inflationMin',
    label: t('inflationMin'),
    detail: `${numeral(data.inflationMin * 100).format('0.[00]')}%`,
  },
  {
    key: 'inflationRateChange',
    label: t('inflationRateChange'),
    detail: `${numeral(data.inflationRateChange * 100).format('0.[00]')}%`,
  },
  {
    key: 'mintDenom',
    label: t('mintDenom'),
    detail: data.mintDenom,
  },
];

export const formatDistribution = (data: Distribution, t: TFunction) => [
  {
    key: 'communityTax',
    label: t('communityTax'),
    detail: `${numeral(data.communityTax * 100).format('0.[00]')}%`,
  },
  {
    key: 'withdrawAddressEnabled',
    label: t('withdrawAddressEnabled'),
    detail: `${data.withdrawAddressEnabled}`.toUpperCase(),
  },
];

export const formatGov = (data: Gov, t: TFunction) => [
  {
    key: 'minDeposit',
    label: t('minDeposit'),
    // Kept the "toUpperCase()" in order to show the token symbol in uppercase
    detail: `${data.minDeposit.value} ${data.minDeposit.displayDenom.toUpperCase()}`,
  },
  {
    key: 'maxDepositPeriod',
    label: t('maxDepositPeriod'),
    detail: convertBySeconds(nanoToSeconds(data.maxDepositPeriod), t),
  },
  {
    key: 'quorum',
    label: t('quorum'),
    detail: `${numeral(data.quorum * 100).format('0.[00]')}%`,
  },
  {
    key: 'threshold',
    label: t('threshold'),
    detail: `${numeral(data.threshold * 100).format('0.[00]')}%`,
  },
  {
    key: 'vetoThreshold',
    label: t('vetoThreshold'),
    detail: `${numeral(data.vetoThreshold * 100).format('0.[00]')}%`,
  },
  {
    key: 'votingPeriod',
    label: t('votingPeriod'),
    detail: convertBySeconds(nanoToSeconds(data.votingPeriod), t),
  },
];

export const formatFeeModel = (data: FeeModel, t: TFunction) => [
  {
    key: 'maxDiscount',
    label: t('maxDiscount'),
    detail: `${numeral(data.maxDiscount * 100).format('0.[00]')}%`,
  },
  {
    key: 'maxBlockGas',
    label: t('maxBlockGas'),
    detail: numeral(data.maxBlockGas).format('0,0'),
  },
  {
    key: 'initialGasPrice',
    label: t('initialGasPrice'),
    detail: numeral(data.initialGasPrice).format('0.[0000]'),
  },
  {
    key: 'longEmaBlockLength',
    label: t('longEmaBlockLength'),
    detail: numeral(data.longEmaBlockLength).format('0,0'),
  },
  {
    key: 'shortEmaBlockLength',
    label: t('shortEmaBlockLength'),
    detail: numeral(data.shortEmaBlockLength).format('0,0'),
  },
  {
    key: 'maxGasPriceMultiplier',
    label: t('maxGasPriceMultiplier'),
    detail: numeral(data.maxGasPriceMultiplier).format('0,0'),
  },
  {
    key: 'escalationStartFraction',
    label: t('escalationStartFraction'),
    detail: numeral(data.escalationStartFraction).format('0.[000]'),
  },
];

export const formatNFT = (data: NFT, t: TFunction) => [
  {
    key: 'nftMintFee',
    label: t('nftMintFee'),
    detail: `${numeral(data.nftMintFee.value).format(
      '0.[0000]'
    )} ${data.nftMintFee.displayDenom.toUpperCase()}`,
  },
];

export const formatFT = (data: FT, t: TFunction) => {
  if (data.tokenUpgradeDecisionTimeout && data.tokenUpgradeGracePeriod !== undefined) {
    // const tokenDecisionTimeout = new Date(data.tokenUpgradeDecisionTimeout);
    return [
      {
        key: 'ftIssueFee',
        label: t('ftIssueFee'),
        detail: `${numeral(data.ftIssueFee.value).format(
          '0.[0000]'
        )} ${data.ftIssueFee.displayDenom.toUpperCase()}`,
      },
      // {
      //   key: 'tokenUpgradeGracePeriod',
      //   label: t('tokenUpgradeGracePeriod'),
      //   detail: convertBySeconds(nanoToSeconds(data.tokenUpgradeGracePeriod), t),
      // },
      // {
      //   key: 'tokenUpgradeDecisionTimeout',
      //   label: t('tokenUpgradeDecisionTimeout'),
      //   detail: `${tokenDecisionTimeout.toLocaleDateString()} at ${tokenDecisionTimeout.toLocaleTimeString()}`,
      // },
    ];
  }
  return [
    {
      key: 'ftIssueFee',
      label: t('ftIssueFee'),
      detail: `${numeral(data.ftIssueFee.value).format(
        '0.[0000]'
      )} ${data.ftIssueFee.displayDenom.toUpperCase()}`,
    },
  ];
};

export const formatAuth = (data: Auth, t: TFunction) => [
  {
    key: 'txSigLimit',
    label: t('txSigLimit'),
    detail: numeral(data.txSigLimit).format('0,0'),
  },
  {
    key: 'maxMemoCharacters',
    label: t('maxMemoCharacters'),
    detail: numeral(data.maxMemoCharacters).format('0,0'),
  },
  {
    key: 'txSizeCostPerByte',
    label: t('txSizeCostPerByte'),
    detail: numeral(data.txSizeCostPerByte).format('0,0'),
  },
  {
    key: 'sigVerifyCostEd25519',
    label: t('sigVerifyCostEd25519'),
    detail: numeral(data.sigVerifyCostEd25519).format('0,0'),
  },
  {
    key: 'sigVerifyCostSecp256k1',
    label: t('sigVerifyCostSecp256k1'),
    detail: numeral(data.sigVerifyCostSecp256k1).format('0,0'),
  },
];

export const formatDex = (data: Dex, t: TFunction) => [
  {
    key: 'defaultUnifiedRefAmount',
    label: t('defaultUnifiedRefAmount'),
    detail: numeral(data.default_unified_ref_amount).format('0,0'),
  },
  {
    key: 'maxOrdersPerDenom',
    label: t('maxOrdersPerDenom'),
    detail: numeral(data.max_orders_per_denom).format('0,0'),
  },
  {
    key: 'priceTickExponent',
    label: t('priceTickExponent'),
    detail: numeral(data.price_tick_exponent).format('0,0'),
  },
  {
    key: 'orderReserve',
    label: t('orderReserve'),
    detail: `${formatNumber(formatToken(data.order_reserve.amount, data.order_reserve.denom).value, formatToken(data.order_reserve.amount, data.order_reserve.denom).exponent)} ${formatToken(data.order_reserve.amount, data.order_reserve.denom).displayDenom.toUpperCase()}`,
  },
];

const renderAddressList = (addresses: string[]) => (
  <ul style={{ margin: 0, paddingLeft: 20 }}>
    {addresses.map((address) => (
      <li key={address} style={{ marginBottom: 4, wordBreak: 'break-all' }}>
        <Link shallow prefetch={false} href={ACCOUNT_DETAILS(address)}>
          {address}
        </Link>
      </li>
    ))}
  </ul>
);

export const formatPse = (data: Pse, t: TFunction) => {
  const details: Array<{ key: string; label: string; detail: string | ReactNode }> = [];

  if (data.clearing_account_mappings && data.clearing_account_mappings.length > 0) {
    data.clearing_account_mappings.forEach((mapping) => {
      const translationKey = mapping.clearing_account;
      const title =
        t(translationKey) !== translationKey
          ? t(translationKey)
          : `PSE ${mapping.clearing_account.charAt(0).toUpperCase() + mapping.clearing_account.slice(1)}`;

      const addresses = mapping.recipient_addresses.filter(Boolean);
      details.push({
        key: mapping.clearing_account,
        label: title,
        detail: addresses.length > 0 ? renderAddressList(addresses) : t('none') || 'None',
      });
    });
  }

  if (data.excluded_addresses && data.excluded_addresses.length > 0) {
    details.push({
      key: 'excludedAddresses',
      label: t('excludedAddresses'),
      detail: renderAddressList(data.excluded_addresses),
    });
  } else if (data.excluded_addresses === null) {
    details.push({
      key: 'excluded_none',
      label: t('excludedAddresses'),
      detail: t('none') || 'None',
    });
  }

  return details;
};
