import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgUnfreeze } from '@/models';
import { formatToken } from '@/utils';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import Spinner from '@/components/loadingSpinner';
import Big from 'big.js';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';

const Unfreeze: FC<{
  message: MsgUnfreeze;
  assets: Asset[];
  metadatas: any[];
  assetsLoading: boolean;
  metadataLoading: boolean;
}> = (props) => {
  const { message, assets, metadatas } = props;

  const sender = useProfileRecoil(message.sender);
  const account = useProfileRecoil(message.account);

  const asset = metadatas.find(
    (item) => item.base.toLowerCase() === message.coin.denom.toLowerCase()
  );

  let amount = formatToken(message.coin.amount, message.coin.denom).value;

  if (asset?.denom_units[1].exponent) {
    const availableValue = new Big(+message.coin.amount)
      .div(Big(10).pow(asset?.denom_units[1].exponent))
      .toFixed(asset?.denom_units[1].exponent);

    amount = formatNumberWithThousandsSeparator(availableValue);
  }

  const tokenInAssets = assets.find(
    (assetItem) => message.coin.denom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  let displayDenom = asset?.display.toUpperCase() || message.coin.denom.toUpperCase();
  if (tokenInAssets && tokenInAssets?.extra.xrpl_info) {
    displayDenom =
      tokenInAssets?.extra.xrpl_info.currency.length === 40
        ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
        : tokenInAssets?.extra.xrpl_info.currency;
  }

  let parsedAmount = `${amount} ${displayDenom}`;

  if (tokenInAssets) {
    if (message.coin.denom.includes('ibc')) {
      const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
      const availableValue = new Big(+message.coin.amount)
        .div(Big(10).pow(tokenInAssets.extra.ibc_info!.precision))
        .toFixed(tokenInAssets.extra.ibc_info!.precision);
      amount = formatNumberWithThousandsSeparator(availableValue);

      parsedAmount = `${amount} ${tokenDenom}`;
    }
  }

  if (props.assetsLoading || props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgUnfreezeContent"
        components={[
          <Name address={message.sender} name={sender.name ?? message.sender} />,
          <b />,
          <Name address={message.account} name={account.name ?? message.account} />,
        ]}
        values={{
          sender: message.sender,
          account: message.account,
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Unfreeze;
