import useStyles from '@/components/msg/bank/multisend/styles';
import Name from '@/components/name';
import { MsgMultiSend } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumber, formatToken } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import { FC } from 'react';

const RecieverName: FC<{ address: string; coins: MsgCoin[]; metadatas: any[] }> = (props) => {
  const { address: theAddress, coins, metadatas } = props;
  const { t } = useTranslation('transactions');
  const { address, name } = useProfileRecoil(theAddress);
  const recieverMoniker = name || theAddress;

  const parsedAmount = coins
    ?.map((x) => {
      const asset = metadatas.find((item) => item.base.toLowerCase() === x.denom.toLowerCase());

      const amount = asset
        ? formatToken(String(+x.amount / 10 ** asset.denom_units[1].exponent))
        : formatToken(x.amount, x.denom);
      // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      return `${formatNumber(amount.value, amount.exponent)} ${asset ? asset.display.toUpperCase() : amount.displayDenom.toUpperCase()}`;
    })
    .reduce(
      (text, value, j, array) => text + (j < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );
  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMultisendContentTwo"
        components={[<Name address={address} name={recieverMoniker} />, <b />]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

const Multisend: FC<{ message: MsgMultiSend; metadatas: any[] }> = (props) => {
  const { t } = useTranslation('transactions');
  const { classes } = useStyles();

  const { message, metadatas } = props;

  const sender = message.inputs[0];
  const senderAmount = sender?.coins
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

  const { address, name } = useProfileRecoil(sender?.address);
  const validatorMoniker = name || sender?.address;

  return (
    <div>
      <Typography>
        <Trans
          i18nKey="message_contents:txMultisendContentOne"
          components={[<Name address={address} name={validatorMoniker} />, <b />]}
          values={{
            amount: senderAmount,
          }}
        />
      </Typography>
      <div className={classes.multisend}>
        {message?.outputs
          ?.filter((x) => x)
          ?.map((x) => (
            <RecieverName
              key={x.address}
              address={x.address}
              coins={x.coins}
              metadatas={metadatas}
            />
          ))}
      </div>
    </div>
  );
};

export default Multisend;
