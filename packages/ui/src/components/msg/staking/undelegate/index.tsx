import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import { MsgUndelegate } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatToken } from '@/utils/format_token';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import Spinner from '@/components/loadingSpinner';
import Big from 'big.js';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';

const Undelegate: FC<{
  message: MsgUndelegate;
  assets: Asset[];
  metadatas: any[];
  assetsLoading: boolean;
  metadataLoading: boolean;
}> = (props) => {
  const { message, assets, metadatas } = props;
  const asset = metadatas.find(
    (item) => item.base.toLowerCase() === message.amount.denom.toLowerCase()
  );

  let amount = formatToken(message.amount.amount, message.amount.denom).value;

  if (asset?.denom_units[1].exponent) {
    const availableValue = new Big(+message.amount.amount)
      .div(Big(10).pow(asset?.denom_units[1].exponent))
      .toFixed(asset?.denom_units[1].exponent);

    amount = formatNumberWithThousandsSeparator(availableValue);
  }

  const tokenInAssets = assets.find(
    (assetItem) => message.amount.denom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  let displayDenom = asset?.display.toUpperCase() || message.amount.denom.toUpperCase();
  if (
    tokenInAssets &&
    tokenInAssets?.extra.xrpl_info &&
    tokenInAssets?.extra.xrpl_info.source_chain === 'XRPL'
  ) {
    displayDenom =
      tokenInAssets?.extra.xrpl_info.currency.length === 40
        ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
        : tokenInAssets?.extra.xrpl_info.currency;
  }
  let parsedAmount = `${amount} ${displayDenom}`;
  if (tokenInAssets) {
    if (message.amount.denom.includes('ibc')) {
      const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
      const availableValue = new Big(+message.amount.amount)
        .div(Big(10).pow(tokenInAssets.extra.ibc_info!.precision))
        .toFixed(tokenInAssets.extra.ibc_info!.precision);
      amount = formatNumberWithThousandsSeparator(availableValue);

      parsedAmount = `${amount} ${tokenDenom}`;
    }
  }

  const delegator = useProfileRecoil(message.delegatorAddress);
  const delegatorMoniker = delegator ? delegator?.name : message.delegatorAddress;

  const validator = useProfileRecoil(message.validatorAddress);
  const validatorMoniker = validator ? validator?.name : message.validatorAddress;

  if (props.assetsLoading || props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUndelegateContent"
        components={[
          <Name address={message.delegatorAddress} name={delegatorMoniker} />,
          <b />,
          <Name address={message.validatorAddress} name={validatorMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Undelegate;
