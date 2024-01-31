import Name from '@/components/name';
import { MsgSend } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumber, formatToken } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import { FC } from 'react';

const Send: FC<{ message: MsgSend; metadatas: any[] }> = (props) => {
  const { t } = useTranslation('transactions');
  const { message, metadatas } = props;

  const parsedAmount = message?.amount
    ?.map((x) => {
      const asset = metadatas.find((item) => item.base.toLowerCase() === x.denom.toLowerCase());

      const amount = asset
        ? formatToken(String(+x.amount / 10 ** asset.denom_units[1].exponent))
        : formatToken(x.amount, x.denom);

      // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      return `${formatNumber(amount.value, amount.exponent)} ${asset ? asset.display.toUpperCase() : amount.displayDenom.toUpperCase()}`;
    })
    .reduce(
      (text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );

  const from = useProfileRecoil(message.fromAddress);
  const fromMoniker = from ? from?.name : message.fromAddress;

  const to = useProfileRecoil(message.toAddress);
  const toMoniker = to ? to?.name : message.toAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txSendContent"
        components={[
          <Name address={message.fromAddress} name={fromMoniker} />,
          <b />,
          <Name address={message.toAddress} name={toMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Send;
