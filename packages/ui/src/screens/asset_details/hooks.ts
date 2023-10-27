import { useState } from 'react';
import {
  AssetDetailsState,
  ExtendedAssetFTType,
  AssetLink,
  SocialMediaAssetLink,
} from '@/screens/asset_details/types';

const mockedPriceChanges = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
];

const mockedLinks: AssetLink[] = [
  {
    type: 'website',
    link: '#',
  },
  {
    type: 'github',
    link: '#',
  },
  {
    type: 'whitepaper',
    link: '#',
  },
  {
    type: 'audit_report',
    link: '#',
  },
  {
    type: 'explorer',
    link: '#',
  },
];

const mockedSocialLinks: SocialMediaAssetLink[] = [
  {
    type: 'twitter',
    link: '#',
  },
  {
    type: 'instagram',
    link: '#',
  },
  {
    type: 'facebook',
    link: '#',
  },
  {
    type: 'reddit',
    link: '#',
  },
  {
    type: 'youtube',
    link: '#',
  },
  {
    type: 'telegram',
    link: '#',
  },
];

const mockedAsset: ExtendedAssetFTType = {
  id: 1,
  name: 'Coreum',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis id sapien hendrerit porttitor. Integer nec aliquam quam. Sed diam nisl, efficitur vitae condimentum ut, maximus a sapien. ',
  logo: '',
  subunit: 'ucore',
  precision: '6',
  globally_frozen: 'XXXX',
  holders: '559305',
  issuer: 'core1q39n0uqay2pk0cc6wrsamw4y5zjqek047w67wn',
  minting_enabled: true,
  burning_enabled: true,
  freezing_enabled: true,
  whitelisting_enabled: false,
  burn_rate: 'XXXX',
  send_commission_rate: 'XXXX',
  price: '1',
  price_usd: '0.32214',
  price_change: '0.02',
  market_cap: '63484950',
  total_supply: '100000000',
  token_type: 'GOV',
  chain: 'Chain',
  address: 'xxxx',
  links: mockedLinks,
  social_media: mockedSocialLinks,
  price_changes_7days: mockedPriceChanges,
};

const defaultAsset: ExtendedAssetFTType = {
  id: -1,
  name: '',
  description: '',
  logo: '',
  subunit: '',
  precision: 'XXXX',
  globally_frozen: 'XXXX',
  holders: 'XXXX',
  issuer: '',
  minting_enabled: false,
  burning_enabled: false,
  freezing_enabled: false,
  whitelisting_enabled: false,
  burn_rate: 'XXXX',
  send_commission_rate: 'XXXX',
  price: '',
  price_usd: '',
  price_change: '',
  market_cap: '',
  total_supply: '',
  token_type: '',
  chain: '',
  address: 'addr',
  links: [],
  social_media: [],
  price_changes_7days: [],
};

const initialState: AssetDetailsState = {
  exists: true,
  asset: mockedAsset || defaultAsset,
};

export const useAssetDetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState<AssetDetailsState>(initialState);

  // const handleSetState = useCallback(
  //   (stateChange: (prevState: AssetDetailsState) => AssetDetailsState) => {
  //     setState((prevState) => {
  //       const newState = stateChange(prevState);
  //       return R.equals(prevState, newState) ? prevState : newState;
  //     });
  //   },
  //   []
  // );

  // ==========================
  // Fetch Data
  // ==========================
  // const { loading } = useAssetDetailsQuery({
  //   variables: {
  //     address: router.query.address as string,
  //   },
  //   onCompleted: (data) => {
  //     handleSetState((prevState) => ({ ...prevState, data }));
  //   },
  // });

  return { state, loading: false };
};
