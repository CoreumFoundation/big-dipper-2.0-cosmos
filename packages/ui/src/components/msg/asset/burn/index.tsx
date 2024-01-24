import { FC } from 'react';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import { MsgBurn } from '@/models';
import Name from '@/components/name';
import { useProfileRecoil } from '@/recoil/profiles';
import { formatNumber, formatToken } from '@/utils';
import { Asset } from '@/screens/assets/hooks';

const Burn: FC<{ message: MsgBurn; assets: Asset[] }> = (props) => {
  const { message, assets } = props;

  const amount = formatToken(message.coin.amount, message.coin.denom);
  let parsedAmount = `${formatNumber(
    amount.value,
    amount.exponent
    // Kept the "toUpperCase()" in order to show the token symbol in uppercase
  )} ${amount.displayDenom.toUpperCase()}`;

  const tokenInAssets = assets.find(
    (assetItem) => amount.displayDenom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  if (tokenInAssets) {
    if (amount.displayDenom.includes('ibc')) {
      const tokenDenom = tokenInAssets.ibc_info.display_name;
      parsedAmount = `${formatNumber(
        String(+amount.value / 10 ** tokenInAssets.ibc_info.precision),
        tokenInAssets.ibc_info.precision
        // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      )} ${tokenDenom}`;
    }
  }

  const sender = useProfileRecoil(message.sender);

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
