import {
  Caip25CaveatType,
  Caip25EndowmentPermissionName,
} from '@metamask/chain-agnostic-permission';
import { DEFAULT_GANACHE_PORT } from '../../app/util/test/ganache';
import { DEFAULT_ANVIL_PORT } from '../../e2e/seeder/anvil-manager';
import {
  DEFAULT_FIXTURE_SERVER_PORT,
  DEFAULT_DAPP_SERVER_PORT,
  DEFAULT_MOCKSERVER_PORT,
} from '../framework/Constants';

/**
 * Transforms a default port number using process ID to create a unique port for CI environments.
 * This helps avoid port conflicts when running multiple test instances.
 *
 * @param {number} defaultPort - The base port number to transform
 * @param {number} pid - The process ID to use for transformation
 * @returns {number} A unique port number within the valid range (0-65535)
 */
function transformToValidPort(defaultPort, pid) {
  // Improve uniqueness by using a simple transformation
  const transformedPort = (parseInt(pid, 10) % 100000) + defaultPort;

  // Ensure the transformed port falls within the valid port range (0-65535)
  return transformedPort % 65536;
}

/**
 * Gets a server port number, either the default port or a transformed unique port for CI environments.
 *
 * @param {number} defaultPort - The default port number to use
 * @returns {number} The port number to use for the server
 */
function getServerPort(defaultPort) {
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
 * Gets the port number for the Ganache test blockchain server.
 *
 * @returns {number} The port number for Ganache
 */
export function getGanachePort() {
  return getServerPort(DEFAULT_GANACHE_PORT);
}
/**
 * Gets the port number for the Anvil test blockchain server.
 *
 * @returns {number} The port number for Anvil
 */
export function AnvilPort() {
  return getServerPort(DEFAULT_ANVIL_PORT);
}
/**
 * Gets the port number for the test fixtures server.
 *
 * @returns {number} The port number for the fixtures server
 */
export function getFixturesServerPort() {
  return getServerPort(DEFAULT_FIXTURE_SERVER_PORT);
}

/**
 * Gets the port number for the local test dapp server.
 *
 * @returns {number} The port number for the local test dapp
 */
export function getLocalTestDappPort() {
  return getServerPort(DEFAULT_DAPP_SERVER_PORT);
}

/**
 * Gets the complete URL for the local test dapp server.
 *
 * @returns {string} The full URL for the local test dapp
 */
export function getLocalTestDappUrl() {
  return `http://localhost:${getLocalTestDappPort()}`;
}

/**
 * Gets the port number for the mock server used in testing.
 *
 * @returns {number} The port number for the mock server
 */
export function getMockServerPort() {
  return getServerPort(DEFAULT_MOCKSERVER_PORT);
}

export function getSecondTestDappPort() {
  // Use a different base port for the second dapp
  return getServerPort(DEFAULT_DAPP_SERVER_PORT + 1);
}

export function buildPermissions(chainIds) {
  // default mainnet
  const optionalScopes = { 'eip155:1': { accounts: [] } };

  for (const chainId of chainIds) {
    optionalScopes[`eip155:${parseInt(chainId)}`] = {
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
