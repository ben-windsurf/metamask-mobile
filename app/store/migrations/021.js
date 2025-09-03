import { IPFS_DEFAULT_GATEWAY_URL } from '../../../app/constants/network';

/**
 * Migration 21: Updates outdated IPFS gateway URLs to the default gateway
 * Replaces deprecated IPFS gateways with the current default gateway URL
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with updated IPFS gateway
 */
export default function migrate(state) {
  const outdatedIpfsGateways = [
    'https://hardbin.com/ipfs/',
    'https://ipfs.greyh.at/ipfs/',
    'https://ipfs.fooock.com/ipfs/',
    'https://cdn.cwinfo.net/ipfs/',
  ];

  const isUsingOutdatedGateway = outdatedIpfsGateways.includes(
    state.engine.backgroundState?.PreferencesController?.ipfsGateway,
  );

  if (isUsingOutdatedGateway) {
    state.engine.backgroundState.PreferencesController.ipfsGateway =
      IPFS_DEFAULT_GATEWAY_URL;
  }
  return state;
}
