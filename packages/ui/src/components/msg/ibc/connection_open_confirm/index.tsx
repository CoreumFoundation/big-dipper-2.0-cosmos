import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import { type MsgConnectionOpenConfirm } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const ConnectionOpenConfirm: FC<{ message: MsgConnectionOpenConfirm }> = (props) => {
  const { message } = props;

  const signer = useProfileRecoil(message.signer);
  const signerMoniker = signer ? signer?.name : message.signer;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txConnectionOpenConfirmContent"
        components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
        values={{
          connectionId: message.connectionId,
        }}
      />
    </Typography>
  );
};

export default ConnectionOpenConfirm;
