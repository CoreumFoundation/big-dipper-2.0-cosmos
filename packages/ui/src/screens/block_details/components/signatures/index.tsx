import Box from '@/components/box';
import NoData from '@/components/no_data';
import Desktop from '@/screens/block_details/components/signatures/components/desktop';
import Mobile from '@/screens/block_details/components/signatures/components/mobile';
import useStyles from '@/screens/block_details/components/signatures/styles';
import { useDisplayStyles } from '@/styles/useSharedStyles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

type SignaturesProps = ComponentDefault & {
  signatures: { address: string; moniker: string }[];
};

const Signatures: FC<SignaturesProps> = ({ className, signatures }) => {
  const { t } = useTranslation('blocks');
  const { classes, cx } = useStyles();
  const display = useDisplayStyles().classes;

  return (
    <Box className={cx(classes.root, className)}>
      <Typography className={classes.title} variant="h2">
        {t('signatures')}
      </Typography>
      {!signatures.length ? (
        <NoData />
      ) : (
        <div className={classes.wrapper}>
          <Desktop className={display.hiddenUntilLg} signatures={signatures} />
          <Mobile className={display.hiddenWhenLg} signatures={signatures} />
        </div>
      )}
    </Box>
  );
};

export default Signatures;
