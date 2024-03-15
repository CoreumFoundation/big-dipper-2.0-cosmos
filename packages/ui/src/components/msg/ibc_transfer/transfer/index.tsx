import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import { MsgTransfer } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumber, formatToken } from '@/utils/format_token';
import { Asset } from '@/screens/assets/hooks';

const Transfer: FC<{ message: MsgTransfer; assets: Asset[] }> = (props) => {
  const { message, assets } = props;

  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;
  const receiver = useProfileRecoil(message.receiver);
  const receiverMoniker = receiver ? receiver?.name : message.receiver;
  const tokenFormatDenom = formatToken(message.token?.amount, message.token?.denom);
  let token = `${formatNumber(
    tokenFormatDenom.value,
    tokenFormatDenom.exponent
    // Kept the "toUpperCase()" in order to show the token symbol in uppercase
  )} ${tokenFormatDenom.displayDenom.toUpperCase()}`;
  const tokenInAssets = assets.find(
    (assetItem) => tokenFormatDenom.displayDenom.toLowerCase() === assetItem.denom.toLowerCase()
  );

  if (tokenInAssets) {
    if (tokenFormatDenom.displayDenom.includes('ibc')) {
      const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
      token = `${formatNumber(
        String(+tokenFormatDenom.value / 10 ** tokenInAssets.extra.ibc_info!.precision),
        tokenInAssets.extra.ibc_info!.precision
        // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      )} ${tokenDenom}`;
    }
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTransferContent"
        components={[
          <Name address={message.sender} name={senderMoniker} />,
          <Name address={message.receiver} name={receiverMoniker} />,
          <b />,
        ]}
        values={{
          token,
          sourceChannel: message.sourceChannel,
        }}
      />
    </Typography>
  );
};

export default Transfer;
