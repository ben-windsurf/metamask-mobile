/* eslint-disable import/prefer-default-export */
///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
import { VirtualFile } from '@metamask/snaps-utils';
import { stringToBytes } from '@metamask/utils';
import { NativeModules } from 'react-native';
import ReactNativeBlobUtil, { FetchBlobResponse } from 'react-native-blob-util';
import {
  BaseNpmLocation,
  getNpmCanonicalBasePath,
} from '@metamask/snaps-controllers';

const { RNTar } = NativeModules;

/** Log tag for NPM-related Snaps operations */
const SNAPS_NPM_LOG_TAG = 'snaps/ NPM';

/**
 * Decompresses a tar.gz file to the specified target path
 * @param path - Path to the compressed file
 * @param targetPath - Directory where the file should be decompressed
 * @returns Promise resolving to the path of the decompressed data
 */
const decompressFile = async (
  path: string,
  targetPath: string,
): Promise<string> => {
  try {
    const decompressedDataLocation = await RNTar.unTar(path, targetPath);
    if (decompressedDataLocation) {
      return decompressedDataLocation;
    }
    throw new Error('Was unable to decompress tgz file');
  } catch (error) {
    throw new Error(`${SNAPS_NPM_LOG_TAG} decompressFile error: ${error}`);
  }
};

/**
 * Recursively finds all file paths within a directory or returns the single file path
 * @param path - Directory or file path to search
 * @returns Promise resolving to array of all file paths found
 */
const findAllPaths = async (path: string): Promise<string[]> => {
  const isDir = await ReactNativeBlobUtil.fs.isDir(path);
  if (!isDir) {
    return [path];
  }
  const fileNames = await ReactNativeBlobUtil.fs.ls(path);
  const paths = fileNames.map((fileName) => `${path}/${fileName}`);
  return (await Promise.all(paths.map(findAllPaths))).flat(
    Infinity,
  ) as string[];
};

/**
 * Reads a file at the specified path and converts its contents to bytes
 * @param path - File path to read
 * @returns Promise resolving to object with path and byte contents
 */
const readAndParseAt = async (path: string) => {
  try {
    const contents = stringToBytes(
      await ReactNativeBlobUtil.fs.readFile(path, 'utf8'),
    );
    return { path, contents };
  } catch (error) {
    throw new Error(`${SNAPS_NPM_LOG_TAG} readAndParseAt error: ${error}`);
  }
};

/**
 * Fetches an NPM package tarball and stores it locally, then decompresses it
 * @param inputRequest - URL or Request object for the NPM package tarball
 * @returns Promise resolving to the path of the decompressed package
 */
const fetchAndStoreNPMPackage = async (
  inputRequest: RequestInfo,
): Promise<string> => {
  const targetDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;
  const filePath = `${targetDir}/archive.tgz`;
  const urlToFetch: string =
    typeof inputRequest === 'string' ? inputRequest : inputRequest.url;

  try {
    const response: FetchBlobResponse = await ReactNativeBlobUtil.config({
      fileCache: true,
      path: filePath,
    }).fetch('GET', urlToFetch);
    const dataPath = response.data;
    const decompressedPath = await decompressFile(dataPath, targetDir);
    // remove response file from cache
    response.flush();
    return decompressedPath;
  } catch (error) {
    throw new Error(
      `${SNAPS_NPM_LOG_TAG} fetchAndStoreNPMPackage failed to fetch with error: ${error}`,
    );
  }
};

/**
 * Cleans up files at the specified path from the filesystem
 * @param path - Path to clean up
 */
const cleanupFileSystem = async (path: string) => {
  ReactNativeBlobUtil.fs.unlink(path).catch((error) => {
    throw new Error(
      `${SNAPS_NPM_LOG_TAG} cleanupFileSystem failed to clean files at path with error: ${error}`,
    );
  });
};

/**
 * NPM location implementation for React Native that handles fetching and processing
 * NPM packages for Snaps using native file system operations
 */
export class NpmLocation extends BaseNpmLocation {
  /**
   * Fetches an NPM tarball and converts it to a map of virtual files
   * @param tarballUrl - URL of the NPM package tarball to fetch
   * @returns Promise resolving to a map of file paths to VirtualFile objects
   */
  async fetchNpmTarball(
    tarballUrl: URL,
  ): Promise<Map<string, VirtualFile<unknown>>> {
    // Fetches and unpacks the NPM package on the local filesystem using native code
    const npmPackageDataLocation = await fetchAndStoreNPMPackage(
      tarballUrl.toString(),
    );

    // Find all paths contained within the tarball
    const paths = await findAllPaths(npmPackageDataLocation);

    const files = await Promise.all(paths.map(readAndParseAt));

    const canonicalBase = getNpmCanonicalBasePath(
      this.meta.registry,
      this.meta.packageName,
    );

    const map = new Map();

    files.forEach(({ path, contents }) => {
      // Remove most of the base path
      const normalizedPath = path.replace(`${npmPackageDataLocation}/`, '');
      map.set(
        normalizedPath,
        new VirtualFile({
          value: contents,
          path: normalizedPath,
          data: { canonicalPath: new URL(path, canonicalBase).toString() },
        }),
      );
    });

    // Cleanup filesystem
    await cleanupFileSystem(npmPackageDataLocation);

    return map;
  }
}
///: END:ONLY_INCLUDE_IF
