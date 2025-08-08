import { bech32 } from 'bech32';
import chainConfig from '@/chainConfig';

const { prefix } = chainConfig();

export const toValidatorAddress = (address: string) => {
  try {
    if (!address || address.length > 90) {
      return '';
    }
    const decode = bech32.decode(address).words;

    return bech32.encode(prefix?.validator, decode);
  } catch (error) {
    console.error(`Error processing address ${address}:`, error);
    return '';
  }
};

export const isValidAddress = (address: string) => {
  try {
    const decodedAddress = bech32.decode(address);
    const { prefix: decodedPrefix, words } = decodedAddress;

    if (decodedPrefix && words.length === 32) {
      return true;
    }
  } catch {
    // error
  }

  return false;
};
