import { LanguageAndLocale } from 'detox/detox';
import { DappVariants } from './Constants';
import { AnvilManager, Hardfork } from '../seeder/anvil-manager';
import ContractAddressRegistry from '../../app/util/test/contract-address-registry';
import Ganache from '../../app/util/test/ganache';
import { Mockttp } from 'mockttp';
import FixtureBuilder from './fixtures/FixtureBuilder';

/**
 * Base options for gesture operations
 */
export interface GestureOptions {
  /** Timeout in milliseconds for the operation */
  timeout?: number;
  /** Whether to check element stability before interaction */
  checkStability?: boolean;
  /** Whether to check element visibility before interaction */
  checkVisibility?: boolean;
  /** Whether to check if element is enabled before interaction */
  checkEnabled?: boolean;
  /** Description for better error messages (e.g., "Get Started button") */
  elemDescription?: string;
}

/**
 * Options for tap gesture operations
 */
export interface TapOptions extends GestureOptions {
  /** Delay in milliseconds before the tap action */
  delay?: number;
  /** If true, waits for the element to disappear after tapping */
  waitForElementToDisappear?: boolean;
}

/**
 * Options for text input operations
 */
export interface TypeTextOptions extends GestureOptions {
  /** Whether to clear the field before typing */
  clearFirst?: boolean;
  /** Whether to hide the keyboard after typing */
  hideKeyboard?: boolean;
  /** If true, the text will not be logged in the test report */
  sensitive?: boolean;
}

/**
 * Options for swipe gesture operations
 */
export interface SwipeOptions extends GestureOptions {
  /** Speed of the swipe gesture */
  speed?: 'fast' | 'slow';
  /** Percentage of the element to swipe */
  percentage?: number;
}

/**
 * Options for long press gesture operations
 */
export interface LongPressOptions extends GestureOptions {
  /** Duration of the long press in milliseconds */
  duration?: number;
}

/**
 * Options for scroll operations
 */
export interface ScrollOptions extends GestureOptions {
  /** Direction to scroll */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Amount to scroll in pixels */
  scrollAmount?: number;
}

/**
 * Options for assertion operations
 */
export interface AssertionOptions extends RetryOptions {
  /** Timeout in milliseconds for the assertion */
  timeout?: number;
  /** Description for the assertion (e.g., "The Wallet View should be visible") */
  description?: string;
}

/**
 * Options for retry operations
 */
export interface RetryOptions {
  /** Timeout in milliseconds for the retry operation */
  timeout?: number;
  /** Interval between retries in milliseconds */
  interval?: number;
  /** Description for the retry operation (e.g., "tap()" or "waitForReadyState()") */
  description?: string;
  /** Description of the element being operated on */
  elemDescription?: string;
  /** Maximum number of retry attempts */
  maxRetries?: number;
}

/**
 * Options for element stability checking
 */
export interface StabilityOptions {
  /** Timeout in milliseconds for stability checking */
  timeout?: number;
  /** Interval between stability checks in milliseconds */
  interval?: number;
  /** Number of consecutive stable checks required */
  stableCount?: number;
}
/**
 * Configuration for ramps region settings
 */
export interface RampsRegion {
  /** Supported currencies in this region */
  currencies: string[];
  /** Emoji representation of the region */
  emoji: string;
  /** Unique identifier for the region */
  id: string;
  /** Display name of the region */
  name: string;
  /** Support configuration for different operations */
  support: { buy: boolean; sell: boolean; recurringBuy: boolean };
  /** Whether this region is unsupported */
  unsupported: boolean;
  /** Whether this region is recommended */
  recommended: boolean;
  /** Whether this region was auto-detected */
  detected: boolean;
}

// Fixtures and Local Node Types
// Available local node types
export enum LocalNodeType {
  anvil = 'anvil',
  ganache = 'ganache',
  bitcoin = 'bitcoin',
}

export enum GanacheHardfork {
  london = 'london',
}

export interface LocalNodeConfig {
  type: LocalNodeType;
  options: AnvilNodeOptions | GanacheNodeOptions;
}

export interface GanacheNodeOptions {
  hardfork: GanacheHardfork;
  mnemonic: string;
  [key: string]: unknown; // Allow additional properties of any type
}
export interface AnvilNodeOptions {
  hardfork?: Hardfork;
  loadState?: string;
  balance?: number;
  blockTime?: number;
  chainId?: number;
  gasLimit?: number;
  gasPrice?: number;
  host?: string;
  mnemonic?: string;
  port?: number;
  noMining?: boolean;
}

export type LocalNodeOptionsInput = LocalNodeConfig[];

// Fixture Builder types
export interface BackupAndSyncSettings {
  isBackupAndSyncEnabled: boolean;
  isAccountSyncingEnabled: boolean;
  isContactSyncingEnabled: boolean;
}

export interface LaunchArgs {
  fixtureServerPort: string;
  detoxURLBlacklistRegex: string;
  mockServerPort: string;
}

/**
 * The options for the dapp to load for test.
 * @param {DappVariants | string} dappVariant - The variant of the dapp to load.
 * If a string is provided, a dappPath needs to be provided as well.
 * Please consider adding the new dapp to the existing enum.
 * @example
 * {
 *  dappVariant: DappVariants.TEST_DAPP,
 * }
 * // or
 * @example
 * {
 *  dappVariant: 'https://example.com',
 *  dappPath: 'PATH_TO_DAPP',
 * }
 * @param {string} [dappPath] - The path to the dapp to load.
 */
export interface DappOptions {
  dappVariant: DappVariants | string;
  dappPath?: string;
}

export type TestSuiteFunction = (params: TestSuiteParams) => Promise<void>;

export type LocalNode = AnvilManager | Ganache;

export interface TestSuiteParams {
  contractRegistry?: ContractAddressRegistry;
  mockServer?: Mockttp;
  localNodes?: LocalNode[];
}

export interface TestSpecificMock {
  GET?: MockApiEndpoint[];
  POST?: MockApiEndpoint[];
  PUT?: MockApiEndpoint[];
  [key: string]: MockApiEndpoint[] | undefined;
}

export interface MockApiEndpoint {
  urlEndpoint: string;
  response: unknown;
  responseCode: number;
}

/**
 * The options for the withFixtures function.
 * @param {FixtureBuilder} fixture - The state of the fixture to load.
 * @param {boolean} [restartDevice=false] - If true, restarts the app to apply the loaded fixture.
 * @param {string[]} [smartContracts] - The smart contracts to load for test. These will be deployed on the different {localNodeOptions}
 * @param {LocalNodeOptionsInput} [localNodeOptions] - The local node options to use for the test.
 * @param {boolean} [disableLocalNodes=false] - If true, disables the local nodes.
 * @param {DappOptions[]} [dapps] - The dapps to load for test. The base static port is defined and all dapps from dapp[1] will have the port incremented by 1.
 * @param {Record<string, unknown>} [testSpecificMock] - The test specific mock to load for test. This needs to be properly typed once we convert api-mocking.js to ts
 * @param {Partial<LaunchArgs>} [launchArgs] - The launch arguments to use for the test.
 * @param {LanguageAndLocale} [languageAndLocale] - The language and locale to use for the test.
 * @param {Record<string, unknown>} [permissions] - The permissions to set for the device.
 * @param {Mockttp} [mockServerInstance] - The mock server instance to use for the test. Useful when a custom setup of the mock server is needed.
 * @param {() => Promise<void>} [endTestfn] - The function to execute after the test is finished.
 */
export interface WithFixturesOptions {
  fixture: FixtureBuilder;
  restartDevice?: boolean;
  smartContracts?: string[];
  disableLocalNodes?: boolean;
  dapps?: DappOptions[];
  localNodeOptions?: LocalNodeOptionsInput;
  testSpecificMock?: TestSpecificMock;
  launchArgs?: Partial<LaunchArgs>;
  languageAndLocale?: LanguageAndLocale;
  permissions?: Record<string, unknown>;
  mockServerInstance?: Mockttp;
  endTestfn?: (options: { mockServer: Mockttp }) => Promise<void>;
}
