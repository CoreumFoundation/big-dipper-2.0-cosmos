import AvatarName from '@/components/avatar_name';
import { useList, useListRow } from '@/hooks';
import SingleValidator from '@/screens/validators/components/list/components/mobile/component/single_validator';
import VotingPower from '@/screens/validators/components/list/components/voting_power';
import type { ItemType } from '@/screens/validators/components/list/types';
import { getValidatorStatus } from '@/utils/get_validator_status';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';
import numeral from 'numeral';
import React, { FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  item: ItemType;
  isLast: boolean;
  search: string;
  i: number;
};

const ListItem: FC<ListItemProps> = ({ index, style, setRowHeight, item, isLast, search, i }) => {
  const { rowRef } = useListRow(index, setRowHeight);
  const { name, address, imageUrl } = item.validator;

  if (search) {
    const formattedSearch = search.toLowerCase().replace(/ /g, '');
    if (
      !name.toLowerCase().replace(/ /g, '').includes(formattedSearch) &&
      !address.toLowerCase().includes(formattedSearch)
    ) {
      return null;
    }
  }

  const status = getValidatorStatus(item.inActiveSet, item.jailed, item.tombstoned);
  const percentDisplay = item.inActiveSet
    ? `${numeral(item.votingPowerPercent.toFixed(6)).format('0.[00]')}%`
    : '0%';
  const votingPower = numeral(item.votingPower).format('0,0');
  const selectedItem = {
    idx: `#${i + 1}`,
    validator: <AvatarName address={address} imageUrl={imageUrl} name={name} />,
    commission: `${numeral(item.commission).format('0.[00]')}%`,
    votingPower: (
      <VotingPower
        percentDisplay={percentDisplay}
        percentage={item.votingPowerPercent}
        content={votingPower}
        topVotingPower={item.topVotingPower ?? false}
      />
    ),
    status,
  };
  return (
    <div style={style}>
      <div ref={rowRef}>
        <SingleValidator {...selectedItem} />
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

type MobileProps = {
  className?: string;
  items: ItemType[];
  search: string;
};

const Mobile: FC<MobileProps> = ({ className, items, search }) => {
  const { listRef, getRowHeight, setRowHeight } = useList();

  return (
    <div className={classnames(className)}>
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
                key={items[index].validator.address}
                index={index}
                style={style}
                item={items[index]}
                isLast={index === items.length - 1}
                setRowHeight={setRowHeight}
                search={search}
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