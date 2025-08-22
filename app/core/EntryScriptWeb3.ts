// eslint-disable-next-line import/no-namespace
import * as FileSystem from 'expo-file-system';

interface IEntryScriptWeb3 {
  entryScriptWeb3: string | null;
  init(): Promise<string>;
  get(): Promise<string>;
}

const EntryScriptWeb3: IEntryScriptWeb3 = {
  entryScriptWeb3: null,
  // Cache InpageBridgeWeb3 so that it is immediately available
  async init(): Promise<string> {
    this.entryScriptWeb3 = await FileSystem.readAsStringAsync(
      `${FileSystem.bundleDirectory}InpageBridgeWeb3.js`,
    );
    return this.entryScriptWeb3;
  },
  async get(): Promise<string> {
    // Return from cache
    if (this.entryScriptWeb3) return this.entryScriptWeb3;

    // If for some reason it is not available, get it again
    return await this.init();
  },
};

export default EntryScriptWeb3;
