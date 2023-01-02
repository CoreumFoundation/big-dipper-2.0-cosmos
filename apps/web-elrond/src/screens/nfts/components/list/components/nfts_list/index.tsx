import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import NoData from '@/components/no_data';
import { useScreenSize } from '@/hooks';
import type { NFTTypes } from '@/screens/nfts/components/list/types';

const Desktop = dynamic(
  () => import('@/screens/nfts/components/list/components/nfts_list/components/desktop')
);
const Mobile = dynamic(
  () => import('@/screens/nfts/components/list/components/nfts_list/components/mobile')
);

const NftsList: FC<{ items: NFTTypes[] }> = (props) => {
  const { isDesktop } = useScreenSize();

  if (!props.items.length) {
    return <NoData />;
  }

  if (isDesktop) {
    return <Desktop items={props.items} />;
  }

  return <Mobile items={props.items} />;
};

export default NftsList;