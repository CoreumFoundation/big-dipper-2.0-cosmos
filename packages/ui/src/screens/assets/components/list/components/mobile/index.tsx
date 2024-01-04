import { useList, useListRow } from '@/hooks/use_react_window';
import type { AssetFTType } from '@/screens/assets/components/list/types';
import Divider from '@mui/material/Divider';
import { FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import SingleAsset from '@/screens/assets/components/list/components/mobile/component/single_asset';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import { ASSETS_DETAILS } from '@/utils/go_to_page';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  item: any;
  isLast: boolean;
  i: number;
};

const ListItem: FC<ListItemProps> = ({ index, style, setRowHeight, item, isLast, i }) => {
  const { name, tokenType, supply, holders, logo_URIs, denom, display } = item;
  const { rowRef } = useListRow(index, setRowHeight);
  const router = useRouter();

  const selectedItem = {
    id: i,
    name,
    tokenType,
    supply: numeral(supply).format('0,0'),
    holders: numeral(holders).format('0,0'),
    denom,
    logo_URIs,
    display,
  };

  return (
    <div style={style}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={() => router.push(ASSETS_DETAILS(item.denom))} ref={rowRef}>
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
