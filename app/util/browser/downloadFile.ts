import { Linking } from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import { ShareOpenResult } from 'react-native-share/lib/typescript/types';
import ReactNativeBlobUtil, { FetchBlobResponse } from 'react-native-blob-util';
import { strings } from '../../../locales/i18n';
import Device from '../device';

/**
 * Result of a file download operation.
 * @interface DownloadResult
 * @property success - Whether the download was successful
 * @property message - Success message or error description
 */
interface DownloadResult {
  success: boolean;
  message: string;
}

/**
 * Shares a file using the native share dialog.
 * @param filePath - The path to the file to share
 * @returns Promise that resolves to the share result
 */
const shareFile = async (filePath: string) => {
  const options: ShareOptions = {
    url: filePath,
    saveToFiles: true,
    failOnCancel: false,
  };
  return await Share.open(options);
};

/**
 * Checks if the downloaded file is an Apple Wallet Pass and handles it appropriately.
 * @param response - The fetch response containing the downloaded file
 * @param downloadUrl - The original download URL
 * @returns Promise that resolves to a DownloadResult if it's an Apple Wallet Pass, undefined otherwise
 */
const checkAppleWalletPass = async (
  response: FetchBlobResponse,
  downloadUrl: string,
) => {
  /**
   * Support native UI for downloading Apple Wallet Passes
   */
  const APPLE_WALLET_PASS_MIME_TYPE = 'application/vnd.apple.pkpass';
  if (
    Device.isIos() &&
    response.respInfo &&
    response.respInfo.headers['Content-Type'] === APPLE_WALLET_PASS_MIME_TYPE
  ) {
    try {
      await Linking.openURL(downloadUrl);
      return {
        success: true,
        message: 'success',
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          message: err.message.toString(),
        };
      }
      return {
        success: false,
        message: strings('download_files.message'),
      };
    }
  }
};

/**
 * Downloads a file from the given URL and handles sharing or opening it.
 * Supports special handling for Apple Wallet Passes on iOS devices.
 * @param downloadUrl - The URL of the file to download
 * @returns Promise that resolves to a DownloadResult indicating success or failure
 */
const downloadFile = async (downloadUrl: string): Promise<DownloadResult> => {
  const { config } = ReactNativeBlobUtil;
  const response: FetchBlobResponse = await config({ fileCache: true }).fetch(
    'GET',
    downloadUrl,
  );

  const checkAppleWalletPassResponse = await checkAppleWalletPass(
    response,
    downloadUrl,
  );

  if (checkAppleWalletPassResponse) {
    return checkAppleWalletPassResponse;
  }

  const path = response.path();
  if (path) {
    try {
      const shareResponse: ShareOpenResult = await shareFile(path);
      return {
        success: shareResponse.success,
        message: shareResponse.message,
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          message: err.message.toString(),
        };
      }
      return {
        success: false,
        message: strings('download_files.message'),
      };
    }
  }
  return {
    success: false,
    message: response.text().toString(),
  };
};

export default downloadFile;
