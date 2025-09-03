import { getGanachePort } from '../../../e2e/fixtures/utils';
import ganache from 'ganache';

/**
 * Default port number for Ganache test server
 */
export const DEFAULT_GANACHE_PORT = 8545;

const defaultOptions = {
  blockTime: 2,
  network_id: 1337,
  port: DEFAULT_GANACHE_PORT,
  vmErrorsOnRPCResponse: false,
  hardfork: 'muirGlacier',
  quiet: false,
};

/**
 * Ganache test server wrapper for managing local blockchain instances
 * Provides methods to start/stop the server and interact with test accounts
 */
export default class Ganache {
  /**
   * Starts the Ganache server with the provided options
   * @param {Object} opts - Configuration options for the Ganache server
   * @param {string} opts.mnemonic - Required mnemonic for account generation
   * @throws {Error} If mnemonic is missing or server fails to start
   */
  async start(opts) {
    if (!opts.mnemonic) {
      throw new Error('Missing required mnemonic');
    }
    const options = { ...defaultOptions, ...opts, port: getGanachePort() };
    const { port } = options;
    try {
      this._server = ganache.server(options);
      await this._server.listen(port);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Gets the Ganache provider instance
   * @returns {Object|undefined} The Ganache provider or undefined if server not started
   */
  getProvider() {
    return this._server?.provider;
  }

  /**
   * Retrieves all available accounts from the Ganache server
   * @returns {Promise<string[]>} Array of account addresses
   */
  async getAccounts() {
    return await this.getProvider().request({
      method: 'eth_accounts',
      params: [],
    });
  }

  /**
   * Gets the balance of the first account in ETH
   * @returns {Promise<string|number>} Formatted balance in ETH
   */
  async getBalance() {
    const accounts = await this.getAccounts();
    const balanceHex = await this.getProvider().request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    });
    const balanceInt = parseInt(balanceHex, 16) / 10 ** 18;

    const balanceFormatted =
      balanceInt % 1 === 0 ? balanceInt : balanceInt.toFixed(4);

    return balanceFormatted;
  }

  /**
   * Stops the Ganache server and cleans up resources
   * @throws {Error} If server is not running
   */
  async quit() {
    if (!this._server) {
      throw new Error('Server not running yet');
    }
    await this._server.close();
    this._server = undefined;
  }
}
