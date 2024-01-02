import { useList, useListRow } from '@/hooks/use_react_window';
import type { AssetFTType } from '@/screens/assets/components/list/types';
import Divider from '@mui/material/Divider';
import { FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import SingleAsset from '@/screens/assets/components/list/components/mobile/component/single_asset';
import numeral from 'numeral';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  item: any;
  isLast: boolean;
  i: number;
};

const ListItem: FC<ListItemProps> = ({ index, style, setRowHeight, item, isLast, i }) => {
  const { rowRef } = useListRow(index, setRowHeight);
  const { name, tokenType, supply, holders } = item;

  const selectedItem = {
    id: i,
    name,
    tokenType,
    supply: numeral(supply).format('0,0'),
    holders: numeral(holders).format('0,0'),
  };

  return (
    <div style={style}>
      <div ref={rowRef}>
        <SingleAsset {...selectedItem} />
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

type MobileProps = {
  className?: string;
  items: AssetFTType[];
};

const Mobile: FC<MobileProps> = ({ className, items }) => {
  const { listRef, getRowHeight, setRowHeight } = useList();

  return (
    <div className={className}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={items.length}
            itemSize={getRowHeight}
            ref={listRef as LegacyRef<List>}
            width={width}
          >
            {({ index, style }) => (
              <ListItem
                key={items[index].name}
                index={index}
                style={style}
                item={items[index]}
                isLast={index === items.length - 1}
                setRowHeight={setRowHeight}
                i={index}
              />
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default Mobile;
