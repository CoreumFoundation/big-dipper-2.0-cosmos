import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import numeral from 'numeral';
import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import MsgChangeIscnRecordOwnership from '@/models/msg/iscn/msg_change_iscn_record_ownership';
import Name from '@/components/name';

const IscnChangeOwnership: FC<{ message: MsgChangeIscnRecordOwnership }> = (props) => {
  const { message } = props;

  const from = useProfileRecoil(message.from);
  const fromMoniker = from ? from?.name : message.from;

  const to = useProfileRecoil(message.newOwner);
  const toMoniker = to ? to?.name : message.newOwner;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txChangeIscnRecordOwnershipContent"
        components={[
          <Name address={message.from} name={fromMoniker} />,
          <b />,
          <Name address={message.newOwner} name={toMoniker} />,
        ]}
        values={{
          iscnId: numeral(message.iscnId).format('0,0'),
        }}
      />
    </Typography>
  );
};

export default IscnChangeOwnership;
