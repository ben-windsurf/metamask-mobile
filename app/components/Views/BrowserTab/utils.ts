import AppConstants from '../../../core/AppConstants';
import URLParse from 'url-parse';
import { SessionENSNames } from './types';

/**
 * Validates URL for browser navigation in MetaMask Mobile
 * Supports regular domains, localhost URLs, URLs with ports, and HTTPS/HTTP protocols
 * Used to determine if a URL is safe and valid for browser navigation
 * @param {URLParse<string>} url - The parsed URL object to validate
 * @returns {boolean} True if the URL is valid for browser navigation, false otherwise
 */
export const isValidUrl = (url: URLParse<string>): boolean => {
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  try {
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      (urlPattern.test(url.origin) || url.hostname === 'localhost')
    );
  } catch {
    return false;
  }
};

/**
 * Checks if a URL represents an ENS (Ethereum Name Service) website
 * Validates against supported TLDs and checks against an ignore list for exclusions
 * @param {string} urlToCheck - The URL to check for ENS domain
 * @param {string[]} ensIgnoreList - Array of hostnames to ignore even if they match ENS patterns
 * @returns {boolean} True if the URL is an ENS website, false otherwise
 */
export const isENSUrl = (urlToCheck: string, ensIgnoreList: string[]) => {
  const { hostname } = new URLParse(urlToCheck);
  const tld = hostname.split('.').pop();
  if (
    tld &&
    AppConstants.supportedTLDs.indexOf(
      tld.toLowerCase() as 'eth' | 'xyz' | 'test',
    ) !== -1
  ) {
    // Make sure it's not in the ignore list
    if (ensIgnoreList.indexOf(hostname) === -1) {
      return true;
    }
  }
  return false;
};

/**
 * Gets the user-friendly URL to display in the browser address bar
 * Converts IPFS/IPNS/Swarm gateway URLs back to their original ENS names for better UX
 * For example, converts IPFS gateway URL back to [site].eth format
 * @param {string} urlToMask - The gateway URL to convert back to ENS format
 * @param {SessionENSNames} sessionENSNames - Mapping of ENS names to their resolved gateway information
 * @returns {string} The masked URL showing ENS name instead of gateway URL, or original URL if no masking needed
 */
export const getMaskedUrl = (
  urlToMask: string,
  sessionENSNames: SessionENSNames,
) => {
  if (!urlToMask) return urlToMask;
  let replace = null;
  if (urlToMask.startsWith(AppConstants.IPFS_DEFAULT_GATEWAY_URL)) {
    replace = (key: string) =>
      `${AppConstants.IPFS_DEFAULT_GATEWAY_URL}${sessionENSNames[key].hash}/`;
  } else if (urlToMask.startsWith(AppConstants.IPNS_DEFAULT_GATEWAY_URL)) {
    replace = (key: string) =>
      `${AppConstants.IPNS_DEFAULT_GATEWAY_URL}${sessionENSNames[key].hostname}/`;
  } else if (urlToMask.startsWith(AppConstants.SWARM_DEFAULT_GATEWAY_URL)) {
    replace = (key: string) =>
      `${AppConstants.SWARM_DEFAULT_GATEWAY_URL}${sessionENSNames[key].hash}/`; //TODO: This was SWARM_GATEWAY_URL before, it was broken, understand what it does
  }

  if (replace) {
    const key = Object.keys(sessionENSNames).find((ens) =>
      urlToMask.startsWith(ens),
    );
    if (key) {
      urlToMask = urlToMask.replace(
        replace(key),
        `https://${sessionENSNames[key].hostname}/`,
      );
    }
  }
  return urlToMask;
};
