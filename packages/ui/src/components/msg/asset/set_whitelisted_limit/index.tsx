import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgSetWhitelistedLimit } from '@/models';
import { formatToken } from '@/utils';
import { Asset } from '@/screens/assets/hooks';
import Spinner from '@/components/loadingSpinner';
import Big from 'big.js';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';

const SetWhitelistedLimit: FC<{
  message: MsgSetWhitelistedLimit;
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

  if (props.assetsLoading || props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgSetWhitelistedLimitContent"
        components={[
          <Name address={message.sender} name={sender.name ?? message.sender} />,
          <Name address={message.account} name={account.name ?? message.account} />,
          <b />,
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

export default SetWhitelistedLimit;
