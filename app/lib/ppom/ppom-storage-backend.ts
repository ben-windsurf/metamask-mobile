import { MMKV } from 'react-native-mmkv';
import { StorageBackend, StorageKey } from '@metamask/ppom-validator';

import { getArrayBufferForBlob } from 'react-native-blob-jsi-helper';

declare global {
  interface FileReader {
    _setReadyState(state: number): void;
    _result: Uint8Array | null;
    _error: string | null;
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (window.FileReader?.prototype.readAsArrayBuffer) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.FileReader.prototype.readAsArrayBuffer = function (blob) {
    if (this.readyState === this.LOADING) throw new Error('InvalidStateError');
    this._setReadyState(this.LOADING);
    this._result = null;
    this._error = null;
    this._result = getArrayBufferForBlob(blob);
    this._setReadyState(this.DONE);
  };
}

/**
 * React Native File System storage backend implementation for PPOM validator.
 * Provides persistent storage using MMKV for PPOM data with key-based organization.
 */
class RNFSStorageBackend implements StorageBackend {
  private storage: MMKV;

  /**
   * Creates a new RNFSStorageBackend instance.
   * @param basePath - The base path identifier for the MMKV storage instance
   */
  constructor(basePath: string) {
    this.storage = new MMKV({ id: basePath });
  }

  /**
   * Generates a file path string from a storage key.
   * @param key - The storage key containing name and chainId
   * @returns The formatted file path string
   */
  private _getDataFilePath(key: StorageKey): string {
    return `${key.name}-${key.chainId}`;
  }

  /**
   * Reads data from storage for the given key.
   * @param key - The storage key to read data for
   * @param _checksum - Checksum parameter (unused in this implementation)
   * @returns Promise that resolves to the stored data as ArrayBuffer
   * @throws Error if no data is found or reading fails
   */
  public async read(key: StorageKey, _checksum: string): Promise<ArrayBuffer> {
    let data: Uint8Array | undefined;
    try {
      const buffer = this.storage.getBuffer(this._getDataFilePath(key));

      if (!buffer) {
        throw new Error('No data found');
      }
      data = new Uint8Array(buffer);
    } catch (error) {
      throw new Error(`Error reading data: ${error}`);
    }

    if (!data) {
      throw new Error('No data found');
    }

    return data;
  }

  /**
   * Writes data to storage for the given key.
   * @param key - The storage key to write data for
   * @param data - The data to store as ArrayBuffer
   * @param _checksum - Checksum parameter (unused in this implementation)
   * @returns Promise that resolves when write is complete
   */
  public async write(
    key: StorageKey,
    data: ArrayBuffer,
    _checksum: string,
  ): Promise<void> {
    const dataArray = new Uint8Array(data);

    this.storage.set(this._getDataFilePath(key), dataArray.buffer);
  }

  /**
   * Deletes data from storage for the given key.
   * @param key - The storage key to delete data for
   * @returns Promise that resolves when deletion is complete
   * @throws Error if deletion fails
   */
  public async delete(key: StorageKey): Promise<void> {
    try {
      this.storage.delete(this._getDataFilePath(key));
    } catch (error) {
      throw new Error(`Error deleting data: ${error}`);
    }
  }

  /**
   * Lists all storage keys currently stored.
   * @returns Promise that resolves to an array of all StorageKey objects
   */
  public async dir(): Promise<StorageKey[]> {
    const allKeys = this.storage.getAllKeys();
    const storageKeys: StorageKey[] = [];
    for (const key of allKeys) {
      const [name, chainId] = key.split('-');
      storageKeys.push({ name, chainId });
    }
    return storageKeys;
  }
}

export default RNFSStorageBackend;
