import { useCallback, useEffect, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { AtomState as ValidatorAtomState } from 'ui/recoil/validators';
import { useValidatorAddressesQuery } from '@/graphql/types/general_types';
import { atomFamilyState as profileAtomFamilyState } from '@/recoil/profiles/atom';
import type { AtomState as ProfileAtomState } from '@/recoil/profiles/types';
import { atomFamilyState as validatorAtomState } from '@/recoil/validators/atom';

export const useValidatorRecoil = () => {
  const [validatorAddresses, setValidatorsAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState<boolean>(false);

  const validatorAddressesQuery = useValidatorAddressesQuery({
    variables: {},
    onCompleted: (response) => {
      setValidatorsAddresses(response.validator);
      setIsLoading(false);

      if (response.validator.length < 100) {
        setIsAllDataLoaded(true);
      }
    },
    onError: () => {
      setValidatorsAddresses([]);
      setIsLoading(false);
    },
  });

  const loadMoreItems = useCallback(async () => {
    await validatorAddressesQuery
      .fetchMore({
        variables: {
          offset: validatorAddresses.length || 0,
        },
      })
      .then(({ data: responseData }) => {
        const itemsLength = responseData.validator.length || 0;

        if (itemsLength < 100) {
          setIsAllDataLoaded(true);
        }

        setValidatorsAddresses((prevValue) => prevValue.concat(responseData.validator));
      });
  }, [validatorAddresses.length, validatorAddressesQuery]);

  useEffect(() => {
    if (!isAllDataLoaded && !isLoading) {
      loadMoreItems();
    }
  }, [isAllDataLoaded, isLoading, loadMoreItems]);

  const setValidatorAtomState = useRecoilCallback(
    ({ set }) =>
      (consensusAddress: string, newState: ValidatorAtomState) =>
        set(validatorAtomState(consensusAddress), newState),
    []
  );
  useEffect(() => {
    const map = new Map(
      validatorAddresses
        .filter((x) => x.validatorInfo?.consensusAddress)
        .map((x) => [x.validatorInfo?.consensusAddress ?? '', x])
    );
    map.forEach((x, consensusAddress) => {
      setValidatorAtomState(consensusAddress, {
        delegator: x.validatorInfo?.selfDelegateAddress ?? '',
        validator: x.validatorInfo?.consensusAddress ?? '',
      });
    });
  }, [validatorAddresses, setValidatorAtomState]);

  const setProfileAtomFamilyState = useRecoilCallback(
    ({ set }) =>
      (delegatorAddress: string, newState: ProfileAtomState) =>
        set(
          profileAtomFamilyState(delegatorAddress),
          (prevState: ProfileAtomState): ProfileAtomState => {
            if (!prevState || prevState === true) return newState;
            return prevState.moniker ? prevState : newState;
          }
        ),
    []
  );

  useEffect(() => {
    validatorAddresses.forEach((validator) => {
      if (!validator.validatorInfo?.selfDelegateAddress) return;

      setProfileAtomFamilyState(validator.validatorInfo?.selfDelegateAddress, {
        moniker: validator.validatorDescriptions?.[0]?.moniker || '',
        imageUrl: validator.validatorDescriptions?.[0]?.avatarUrl || '',
      });
    });
  }, [validatorAddresses, setProfileAtomFamilyState]);

  return {
    loading: isLoading,
  };
};
