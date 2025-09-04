/* eslint-disable import/no-nodejs-modules */
import path from 'path';
import { GanacheHardfork } from './types';

// Port Constants
/** Default port for the fixture server used in end-to-end tests */
export const DEFAULT_FIXTURE_SERVER_PORT = 12345;

/** Default port for the mock server used in end-to-end tests */
export const DEFAULT_MOCKSERVER_PORT = 8000;

/** Default port for the dApp server used in end-to-end tests */
export const DEFAULT_DAPP_SERVER_PORT = 8085;

/**
 * Default Ganache configuration options for end-to-end tests.
 * SRP corresponding to the vault set in the default fixtures - it's an empty test account, not secret.
 */
export const defaultGanacheOptions = {
  hardfork: GanacheHardfork.london,
  mnemonic:
    'drive manage close raven tape average sausage pledge riot furnace august tip',
};

/** Default tab ID used for browser tab identification in tests */
export const DEFAULT_TAB_ID = 1749234797566;

/** Path to the default test dApp distribution directory */
export const DEFAULT_TEST_DAPP_PATH = path.join(
  '..',
  '..',
  'node_modules',
  '@metamask',
  'test-dapp',
  'dist',
);

/** Path to the multichain test dApp build directory */
export const DEFAULT_MULTICHAIN_TEST_DAPP_PATH = path.join(
  '..',
  '..',
  'node_modules',
  '@metamask',
  'test-dapp-multichain',
  'build',
);

/** Path to the Solana test dApp distribution directory */
export const DEFAULT_SOLANA_TEST_DAPP_PATH = path.join(
  '..',
  '..',
  'node_modules',
  '@metamask',
  'test-dapp-solana',
  'dist',
);

/**
 * The variants of the dapp to load for test.
 * @enum {string}
 * @example
 * {
 *  dappVariant: DappVariants.TEST_DAPP,
 * }
 * @example
 */
export enum DappVariants {
  TEST_DAPP = 'test-dapp',
  MULTICHAIN_TEST_DAPP = 'multichain-test-dapp',
  SOLANA_TEST_DAPP = 'solana-test-dapp',
}

/**
 * Configuration object mapping dApp variants to their resolved file paths.
 * Used to dynamically load different test dApps during end-to-end testing.
 */
export const TestDapps = {
  [DappVariants.TEST_DAPP]: {
    dappPath: path.resolve(__dirname, DEFAULT_TEST_DAPP_PATH),
  },
  [DappVariants.MULTICHAIN_TEST_DAPP]: {
    dappPath: path.resolve(__dirname, DEFAULT_MULTICHAIN_TEST_DAPP_PATH),
  },
  [DappVariants.SOLANA_TEST_DAPP]: {
    dappPath: path.resolve(__dirname, DEFAULT_SOLANA_TEST_DAPP_PATH),
  },
};

export enum RampsRegionsEnum {
  SAINT_LUCIA = 'saint-lucia',
  FRANCE = 'france',
  UNITED_STATES = 'united-states',
}

export const RampsRegions = {
  [RampsRegionsEnum.SAINT_LUCIA]: {
    currencies: ['/currencies/fiat/xcd'],
    emoji: '🇱🇨',
    id: '/regions/lc',
    name: 'Saint Lucia',
    support: { buy: true, sell: true, recurringBuy: true },
    unsupported: false,
    recommended: false,
    detected: false,
  },
  [RampsRegionsEnum.FRANCE]: {
    currencies: ['/currencies/fiat/eur'],
    emoji: '🇫🇷',
    id: '/regions/fr',
    name: 'France',
    support: { buy: true, sell: true, recurringBuy: true },
    unsupported: false,
    recommended: false,
    detected: false,
  },
  [RampsRegionsEnum.UNITED_STATES]: {
    currencies: ['/currencies/fiat/usd'],
    emoji: '🇺🇸',
    id: '/regions/us-ca',
    name: 'California',
    support: { buy: true, sell: true, recurringBuy: true },
    unsupported: false,
    recommended: false,
    detected: false,
  },
};
