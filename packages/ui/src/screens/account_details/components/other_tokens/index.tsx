import Box from '@/components/box';
import Pagination from '@/components/pagination';
import { usePagination, useScreenSize } from '@/hooks';
import useShallowMemo from '@/hooks/useShallowMemo';
import { useStyles } from '@/screens/account_details/components/other_tokens/styles';
import type { OtherTokenType } from '@/screens/account_details/types';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';

const Desktop = dynamic(
  () => import('@/screens/account_details/components/other_tokens/components/desktop')
);
const Mobile = dynamic(
  () => import('@/screens/account_details/components/other_tokens/components/mobile')
);

type OtherTokensProps = {
  className?: string;
  otherTokens: {
    data: OtherTokenType[];
    count: number;
  };
};

const OtherTokens: FC<OtherTokensProps> = ({ className, otherTokens }) => {
  const { t } = useTranslation('accounts');
  const { isDesktop } = useScreenSize();
  const classes = useStyles();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange, sliceItems } =
    usePagination({});
  const dataMemo = useShallowMemo(otherTokens.data);
  const items = useMemo(() => sliceItems(dataMemo), [dataMemo, sliceItems]);

  const count = dataMemo.length;
  if (!dataMemo.length) {
    return null;
  }

  return (
    <Box className={classnames(className)}>
      <Typography variant="h2">{t('otherTokens')}</Typography>

      {isDesktop ? (
        <Desktop className={classes.desktop} items={items} />
      ) : (
        <Mobile className={classes.mobile} items={items} />
      )}
      <Pagination
        className={classes.paginate}
        total={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};

export default OtherTokens;