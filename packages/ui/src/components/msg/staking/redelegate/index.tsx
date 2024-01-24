import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import { MsgRedelegate } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumber, formatToken } from '@/utils/format_token';
import { Asset } from '@/screens/assets/hooks';

const Redelegate: FC<{ message: MsgRedelegate; assets: Asset[] }> = (props) => {
  const { message, assets } = props;
  const amount = formatToken(message.amount?.amount, message.amount?.denom);

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

  const delegator = useProfileRecoil(message.delegatorAddress);
  const delegatorMoniker = delegator ? delegator?.name : message.delegatorAddress;

  const from = useProfileRecoil(message.validatorSrcAddress);
  const fromMoniker = from ? from?.name : message.validatorSrcAddress;

  const to = useProfileRecoil(message.validatorDstAddress);
  const toMoniker = to ? to?.name : message.validatorDstAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txRedelegateContent"
        components={[
          <Name address={message.delegatorAddress} name={delegatorMoniker} />,
          <b />,
          <Name address={message.validatorSrcAddress} name={fromMoniker} />,
          <Name address={message.validatorDstAddress} name={toMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Redelegate;
