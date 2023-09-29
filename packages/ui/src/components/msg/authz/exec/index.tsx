import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';
import Name from '@/components/name';
import { MsgExec } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const Exec: FC<{ message: MsgExec }> = (props) => {
  const { message } = props;

  const grantee = useProfileRecoil(message.grantee);
  const granteeMoniker = grantee ? grantee?.name : message.grantee;

  const messages = message.messages.length;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:MsgExec"
        components={[<Name address={message.grantee} name={granteeMoniker} />, <b />]}
        values={{
          messages,
        }}
      />
    </Typography>
  );
};

export default Exec;
