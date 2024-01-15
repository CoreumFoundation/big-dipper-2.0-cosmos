import chainConfig from '@/chainConfig';
import { readValidator } from '@/recoil/validators';
import { Asset } from '@/screens/assets/hooks';
import {
  ACCOUNT_DETAILS,
  ASSETS_DETAILS,
  BLOCK_DETAILS,
  PROFILE_DETAILS,
  TRANSACTION_DETAILS,
  VALIDATOR_DETAILS,
} from '@/utils/go_to_page';
import { isValidAddress } from '@/utils/prefix_convert';
import axios from 'axios';
import { TFunction } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilCallback } from 'recoil';

const { extra, prefix, chainType } = chainConfig();
const consensusRegex = new RegExp(`^(${prefix.consensus})`);
const validatorRegex = new RegExp(`^(${prefix.validator})`);
const userRegex = new RegExp(`^(${prefix.account})`);

export const useSearchBar = (t: TFunction) => {
  const router = useRouter();
  const [assets, setAssetsList] = useState<Asset[]>([]);

  const getAssetsList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/${chainType.toLowerCase()}/assets.json`
      );
      setAssetsList(response.data.assets);
    } catch (error) {
      setAssetsList([]);
    }
  }, []);

  useEffect(() => {
    getAssetsList();
  }, []);

  const handleOnSubmit = useRecoilCallback(
    ({ snapshot }) =>
      async (value: string, clear?: () => void) => {
        const parsedValue = value.replace(/\s+/g, '');

        if (/^-?\d+$/.test(String(parsedValue.replace(/[.,]/g, '')))) {
          router.push(BLOCK_DETAILS(String(parsedValue.replace(/[.,]/g, ''))));
        } else if (consensusRegex.test(parsedValue)) {
          const validatorAddress = await snapshot.getPromise(readValidator(parsedValue));
          if (validatorAddress) {
            router.push(VALIDATOR_DETAILS(validatorAddress.validator));
          } else {
            toast<string>(t('common:useValidatorAddress'));
          }
        } else if (validatorRegex.test(parsedValue) && isValidAddress(parsedValue)) {
          router.push(VALIDATOR_DETAILS(parsedValue));
        } else if (userRegex.test(parsedValue) && isValidAddress(parsedValue)) {
          router.push(ACCOUNT_DETAILS(parsedValue));
        } else {
          const assetItem = assets.find((item) => item.denom.includes(parsedValue));

          if (assetItem) {
            router.push(ASSETS_DETAILS(assetItem.denom));
          } else if (/^@/.test(parsedValue)) {
            const configProfile = extra.profile;
            if (!configProfile) {
              toast<string>(t('common:profilesNotEnabled'));
            } else if (parsedValue === '@') {
              toast<string>(t('common:insertValidDtag'));
            } else {
              router.push(PROFILE_DETAILS(parsedValue));
            }
          } else {
            router.push(TRANSACTION_DETAILS(parsedValue));
          }
        }

        if (clear) {
          clear();
        }
      },
    [router, t, assets]
  );

  return {
    handleOnSubmit,
  };
};
