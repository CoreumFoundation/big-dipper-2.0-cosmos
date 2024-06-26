import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import MsgStoreRawDataRequest from '@/models/msg/data/msg_store_raw_data_request';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const StoreRawDataRequest: FC<{ message: MsgStoreRawDataRequest }> = (props) => {
  const { message } = props;

  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:MsgStoreRawDataRequest"
        components={[<Name address={message.sender} name={senderMoniker} />]}
      />
    </Typography>
  );
};

export default StoreRawDataRequest;
