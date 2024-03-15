import { FC } from 'react';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import { MsgBurn } from '@/models';
import Name from '@/components/name';
import { useProfileRecoil } from '@/recoil/profiles';
import { formatToken } from '@/utils';
import { Asset } from '@/screens/assets/hooks';
import Spinner from '@/components/loadingSpinner';
import Big from 'big.js';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';

const Burn: FC<{
  message: MsgBurn;
  assets: Asset[];
  metadatas: any[];
  assetsLoading: boolean;
  metadataLoading: boolean;
}> = (props) => {
  const { message, assets, metadatas, assetsLoading, metadataLoading } = props;
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

  let parsedAmount = `${amount} ${asset?.display.toUpperCase() || message.coin.denom.toUpperCase()}`;

  const tokenInAssets = assets.find(
    (assetItem) => message.coin.denom.toLowerCase() === assetItem.denom.toLowerCase()
  );

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

  const sender = useProfileRecoil(message.sender);

  if (assetsLoading || metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgBurnContent"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Burn;
