import {
  Caip25CaveatType,
  Caip25EndowmentPermissionName,
} from '@metamask/chain-agnostic-permission';

import { DEFAULT_GANACHE_PORT } from '../../../app/util/test/ganache';
import { DEFAULT_ANVIL_PORT } from '../../seeder/anvil-manager';
import {
  DEFAULT_FIXTURE_SERVER_PORT,
  DEFAULT_MOCKSERVER_PORT,
  DEFAULT_DAPP_SERVER_PORT,
} from '../Constants';

/**
 * Transforms a default port number using process ID to create a unique port for CI environments.
 * This helps avoid port conflicts when running multiple test instances simultaneously.
 *
 * @param defaultPort - The base port number to transform
 * @param pid - The process ID used for transformation
 * @returns The transformed port number within valid range (0-65535)
 */
function transformToValidPort(defaultPort: number, pid: number) {
  // Improve uniqueness by using a simple transformation
  const transformedPort = (pid % 100000) + defaultPort;

  // Ensure the transformed port falls within the valid port range (0-65535)
  return transformedPort % 65536;
}

/**
 * Gets the appropriate server port based on the environment.
 * In CI environments, returns a transformed port to avoid conflicts.
 * In local development, returns the default port unchanged.
 *
 * @param defaultPort - The default port number to use
 * @returns The port number to use for the server
 */
function getServerPort(defaultPort: number) {
  if (process.env.CI) {
    return transformToValidPort(defaultPort, process.pid);
  }
  return defaultPort;
}

/**
 * Gets the URL for the second test dapp.
 * This function is used instead of a constant to ensure device.getPlatform() is called
 * after Detox is properly initialized, preventing initialization errors in the apiSpecs tests.
 *
 * @returns {string} The URL for the second test dapp
 */
export function getSecondTestDappLocalUrl() {
  const host = device.getPlatform() === 'android' ? '10.0.2.2' : '127.0.0.1';
  return `http://${host}:${getSecondTestDappPort()}`;
}

/**
 * Gets the local URL for a test dapp with a counter offset.
 * Uses platform-specific host addresses for Android emulator compatibility.
 *
 * @param dappCounter - Counter to offset the port number for multiple dapps
 * @returns The complete URL for the test dapp
 */
export function getTestDappLocalUrl(dappCounter: number) {
  const host = device.getPlatform() === 'android' ? '10.0.2.2' : '127.0.0.1';
  return `http://${host}:${getLocalTestDappPort() + dappCounter}`;
}

/**
 * The local URL for the primary test dapp using localhost.
 * This constant provides a convenient reference for test scenarios.
 */
export const TEST_DAPP_LOCAL_URL = `http://localhost:${getLocalTestDappPort()}`;

/**
 * Gets the port number for the Ganache test blockchain server.
 * Automatically handles CI environment port transformation.
 *
 * @returns The port number for Ganache server
 */
export function getGanachePort(): number {
  return getServerPort(DEFAULT_GANACHE_PORT);
}
/**
 * Gets the port number for the Anvil test blockchain server.
 * Automatically handles CI environment port transformation.
 *
 * @returns The port number for Anvil server
 */
export function AnvilPort(): number {
  return getServerPort(DEFAULT_ANVIL_PORT);
}
/**
 * Gets the port number for the test fixtures server.
 * Automatically handles CI environment port transformation.
 *
 * @returns The port number for fixtures server
 */
export function getFixturesServerPort(): number {
  return getServerPort(DEFAULT_FIXTURE_SERVER_PORT);
}

export function getLocalTestDappPort(): number {
  return getServerPort(DEFAULT_DAPP_SERVER_PORT);
}

export function getMockServerPort(): number {
  return getServerPort(DEFAULT_MOCKSERVER_PORT);
}

export function getSecondTestDappPort(): number {
  // Use a different base port for the second dapp
  return getServerPort(DEFAULT_DAPP_SERVER_PORT + 1);
}

export function buildPermissions(chainIds: string[]): Record<string, unknown> {
  // default mainnet
  const optionalScopes = { 'eip155:1': { accounts: [] } };

  for (const chainId of chainIds) {
    optionalScopes[
      `eip155:${parseInt(chainId, 10)}` as keyof typeof optionalScopes
    ] = {
      accounts: [],
    };
  }
  return {
    [Caip25EndowmentPermissionName]: {
      caveats: [
        {
          type: Caip25CaveatType,
          value: {
            optionalScopes,
            requiredScopes: {},
            sessionProperties: {},
            isMultichainOrigin: false,
          },
        },
      ],
    },
  };
}
