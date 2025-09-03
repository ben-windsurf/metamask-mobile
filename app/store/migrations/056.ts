import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 56: Updates the IPFS gateway from the decommissioned Cloudflare gateway to the new default dweb.link gateway
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with updated IPFS gateway URL
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 56)) {
    // Increment the migration number as appropriate
    return state;
  }

  const preferencesController =
    state.engine.backgroundState.PreferencesController;

  if (!isObject(preferencesController)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration 56: Invalid PreferencesController state error: '${typeof preferencesController}'`,
      ),
    );
    return state;
  }

  const decommisionedIpfsGateway = 'https://cloudflare-ipfs.com/ipfs/';
  const newDefaultIpfsGateway = 'https://dweb.link/ipfs/';

  if (decommisionedIpfsGateway === preferencesController?.ipfsGateway) {
    preferencesController.ipfsGateway = newDefaultIpfsGateway;
  }
  // Return the modified state
  return state;
}
