import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import useStyles from '@/screens/block_details/components/signatures/components/mobile/styles';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { useList, useListRow } from '@/hooks/use_react_window';
import AvatarName from '@/components/avatar_name';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  signatures: { address: string; moniker: string }[] | undefined;
};

const ListItem: FC<ListItemProps> = ({ index, style, setRowHeight, signatures }) => {
  const { t } = useTranslation('blocks');
  const { classes } = useStyles();
  const { rowRef } = useListRow(index, setRowHeight);
  const selectedItem = signatures?.[index];
  const { name, address, imageUrl } = useProfileRecoil(selectedItem?.address ?? '');

  return (
    <div style={style}>
      <div ref={rowRef}>
        {/* single signature start */}
        <div className={classes.itemWrapper}>
          <div className={classes.item}>
            <Typography variant="h4" className="label">
              {t('validator')}
            </Typography>
            <AvatarName
              address={address ?? ''}
              imageUrl={imageUrl}
              name={selectedItem?.moniker || (name ?? '')}
            />
          </div>
        </div>
        {/* single signature end */}
        {!!signatures && index !== signatures.length - 1 && <Divider />}
      </div>
    </div>
  );
};

type MobileProps = {
  className?: string;
  signatures?: { address: string; moniker: string }[];
};

const Mobile: FC<MobileProps> = ({ className, signatures }) => {
  const { listRef, getRowHeight, setRowHeight } = useList();
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={signatures?.length ?? 0}
            itemSize={getRowHeight}
            ref={listRef as LegacyRef<List>}
            width={width}
          >
            {({ index, style }) => (
              <ListItem
                key={index}
                index={index}
                style={style}
                setRowHeight={setRowHeight}
                signatures={signatures}
              />
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default Mobile;
