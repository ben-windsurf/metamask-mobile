/* eslint-disable import/prefer-default-export */
import type { SupportedCurve } from '@metamask/key-tree';

/**
 * Type definition for Snaps derivation path structure.
 * Represents a BIP-32 derivation path starting with 'm' followed by path segments.
 */
export type SnapsDerivationPathType = ['m', ...string[]];

/**
 * Interface defining a Snaps derivation path configuration.
 * Used to specify cryptographic parameters for key derivation in Snaps.
 */
export interface SnapsDerivationPath {
  /** The BIP-32 derivation path array */
  path: SnapsDerivationPathType;
  /** The cryptographic curve to use for key generation */
  curve: SupportedCurve;
  /** Human-readable name for this derivation path */
  name: string;
}

/**
 * Predefined derivation paths for various blockchain networks supported by Snaps.
 * Each path defines the BIP-32 derivation path, cryptographic curve, and network name.
 *
 * Copy of extension mapping: https://github.com/MetaMask/metamask-extension/blob/f37544d16cd24e85a7c36f0e067fa009f115083e/shared/constants/snaps.ts#L52
 */
export const SNAPS_DERIVATION_PATHS: SnapsDerivationPath[] = [
  {
    path: ['m', `44'`, `0'`],
    curve: 'ed25519',
    name: 'Test BIP-32 Path (ed25519)',
  },
  {
    path: ['m', `44'`, `1'`],
    curve: 'secp256k1',
    name: 'Testnet',
  },
  {
    path: ['m', `44'`, `0'`],
    curve: 'secp256k1',
    name: 'Bitcoin Legacy',
  },
  {
    path: ['m', `49'`, `0'`],
    curve: 'secp256k1',
    name: 'Bitcoin Nested SegWit',
  },
  {
    path: ['m', `49'`, `1'`],
    curve: 'secp256k1',
    name: 'Bitcoin Testnet Nested SegWit',
  },
  {
    path: ['m', `84'`, `0'`],
    curve: 'secp256k1',
    name: 'Bitcoin Native SegWit',
  },
  {
    path: ['m', `84'`, `1'`],
    curve: 'secp256k1',
    name: 'Bitcoin Testnet Native SegWit',
  },
  {
    path: ['m', `44'`, `501'`],
    curve: 'ed25519',
    name: 'Solana',
  },
  {
    path: ['m', `44'`, `501'`, "0'", "0'"],
    curve: 'ed25519',
    name: 'Solana',
  },
  {
    path: ['m', `44'`, `2'`],
    curve: 'secp256k1',
    name: 'Litecoin',
  },
  {
    path: ['m', `44'`, `3'`],
    curve: 'secp256k1',
    name: 'Dogecoin',
  },
  {
    path: ['m', `44'`, `60'`],
    curve: 'secp256k1',
    name: 'Ethereum',
  },
  {
    path: ['m', `44'`, `118'`],
    curve: 'secp256k1',
    name: 'Atom',
  },
  {
    path: ['m', `44'`, `145'`],
    curve: 'secp256k1',
    name: 'Bitcoin Cash',
  },
  {
    path: ['m', `44'`, `637'`],
    curve: 'ed25519',
    name: 'Aptos',
  },
  {
    path: ['m', `44'`, `714'`],
    curve: 'secp256k1',
    name: 'Binance (BNB)',
  },
  {
    path: ['m', `44'`, `784'`],
    curve: 'ed25519',
    name: 'Sui',
  },
  {
    path: ['m', `44'`, `931'`],
    curve: 'secp256k1',
    name: 'THORChain (RUNE)',
  },
  {
    path: ['m', `44'`, `330'`],
    curve: 'secp256k1',
    name: 'Terra (LUNA)',
  },
  {
    path: ['m', `44'`, `459'`],
    curve: 'secp256k1',
    name: 'Kava',
  },
  {
    path: ['m', `44'`, `529'`],
    curve: 'secp256k1',
    name: 'Secret Network',
  },
  {
    path: ['m', `44'`, `397'`, `0'`],
    curve: 'ed25519',
    name: 'NEAR Protocol',
  },
  {
    path: ['m', `44'`, `1'`, `0'`],
    curve: 'ed25519',
    name: 'Testnet',
  },
  {
    path: ['m', `44'`, `472'`],
    curve: 'ed25519',
    name: 'Arweave',
  },
  {
    path: ['m', `44'`, `12586'`],
    curve: 'secp256k1',
    name: 'Mina',
  },
  {
    path: ['m', `44'`, `1729'`, `0'`, `0'`],
    curve: 'ed25519',
    name: 'Tezos',
  },
  {
    path: ['m', `1789'`, `0'`],
    curve: 'ed25519',
    name: 'Vega',
  },
];
