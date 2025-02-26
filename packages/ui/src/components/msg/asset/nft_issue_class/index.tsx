import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgNftIssueClass } from '@/models';

const NftIssueClass: FC<{ message: MsgNftIssueClass }> = (props) => {
  const { message } = props;

  const issuer = useProfileRecoil(message.issuer);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgNftIssueClassContent"
        components={[<b />, <Name address={message.issuer} name={issuer.name ?? message.issuer} />]}
        values={{
          name: message.name,
          issuer: message.issuer,
        }}
      />
    </Typography>
  );
};

export default NftIssueClass;
