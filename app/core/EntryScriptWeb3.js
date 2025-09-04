// eslint-disable-next-line import/no-namespace
import * as FileSystem from 'expo-file-system';

/**
 * Utility for managing the Web3 entry script used by the inpage bridge.
 * Provides caching and lazy loading of the InpageBridgeWeb3.js script content.
 */
const EntryScriptWeb3 = {
  entryScriptWeb3: null,
  /**
   * Initialize and cache the Web3 entry script content.
   * Reads the InpageBridgeWeb3.js file from the bundle directory and caches it.
   *
   * @returns {Promise<string>} The Web3 entry script content
   */
  async init() {
    this.entryScriptWeb3 = await FileSystem.readAsStringAsync(
      `${FileSystem.bundleDirectory}InpageBridgeWeb3.js`,
    );
    return this.entryScriptWeb3;
  },
  /**
   * Get the Web3 entry script content, using cache if available.
   * If not cached, initializes and caches the script content.
   *
   * @returns {Promise<string>} The Web3 entry script content
   */
  async get() {
    // Return from cache
    if (this.entryScriptWeb3) return this.entryScriptWeb3;

    // If for some reason it is not available, get it again
    return await this.init();
  },
};

export default EntryScriptWeb3;
