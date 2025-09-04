import qs from 'qs';
import { Alert } from 'react-native';
import UrlParser from 'url-parse';
import { strings } from '../../../../locales/i18n';
import { PROTOCOLS } from '../../../constants/deeplinks';
import Logger from '../../../util/Logger';
import DevLogger from '../../SDKConnect/utils/DevLogger';

/**
 * Interface defining the structure of URL parameters extracted from deeplink URLs.
 * Used for parsing and validating deeplink parameters in the MetaMask mobile app.
 */
export interface DeeplinkUrlParams {
  /** The URI parameter from the deeplink */
  uri: string;
  /** Redirect URL parameter */
  redirect: string;
  /** Channel ID for communication */
  channelId: string;
  /** Communication protocol parameter */
  comm: string;
  /** Public key parameter */
  pubkey: string;
  /** Optional scheme parameter */
  scheme?: string;
  /** Optional version parameter */
  v?: string;
  /** Optional RPC endpoint parameter */
  rpc?: string;
  /** Optional SDK version parameter */
  sdkVersion?: string;
  /** Optional message parameter */
  message?: string;
  /** Optional originator information parameter */
  originatorInfo?: string;
  /** Optional request parameter */
  request?: string;
  /** Optional attribution ID parameter */
  attributionId?: string;
  /** Optional UTM parameter */
  utm?: string;
  /** Optional account parameter in format "address@chainId" */
  account?: string;
}

/**
 * Extracts and parses URL parameters from a deeplink URL.
 * Handles protocol replacement and query string parsing for MetaMask deeplinks.
 *
 * @param url - The deeplink URL to parse
 * @returns Object containing the parsed URL object and extracted parameters
 *
 * @example
 * ```typescript
 * const result = extractURLParams('metamask://dapp/https://example.com?channelId=123&pubkey=abc');
 * console.log(result.params.channelId); // '123'
 * console.log(result.params.pubkey); // 'abc'
 * ```
 */
function extractURLParams(url: string) {
  const urlObj = new UrlParser(
    url
      .replace(`${PROTOCOLS.DAPP}/${PROTOCOLS.HTTPS}://`, `${PROTOCOLS.DAPP}/`)
      .replace(`${PROTOCOLS.DAPP}/${PROTOCOLS.HTTP}://`, `${PROTOCOLS.DAPP}/`),
  );

  let params: DeeplinkUrlParams = {
    pubkey: '',
    uri: '',
    redirect: '',
    v: '',
    sdkVersion: '',
    rpc: '',
    originatorInfo: '',
    channelId: '',
    comm: '',
    attributionId: '',
    utm: '',
  };

  DevLogger.log(`extractParams:: urlObj`, urlObj);

  if (urlObj.query.length) {
    try {
      params = qs.parse(
        urlObj.query.substring(1),
      ) as unknown as DeeplinkUrlParams;

      if (params.message) {
        Logger.log('extractParams:: message before...: ', params.message);
        params.message = params.message?.replace(/ /g, '+');
        Logger.log('extractParams:: message after: ', params.message);
      }
    } catch (e) {
      if (e) Alert.alert(strings('deeplink.invalid'), e.toString());
    }
  }

  return { urlObj, params };
}

export default extractURLParams;
