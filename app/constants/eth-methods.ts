import { EthMethod } from '@metamask/keyring-api';

/**
 * Array of Ethereum methods supported by Externally Owned Accounts (EOAs).
 * These methods represent the core signing operations that can be performed
 * by standard Ethereum accounts using private keys.
 */
export const ETH_EOA_METHODS = [
  EthMethod.PersonalSign,
  EthMethod.SignTransaction,
  EthMethod.SignTypedDataV1,
  EthMethod.SignTypedDataV3,
  EthMethod.SignTypedDataV4,
];
