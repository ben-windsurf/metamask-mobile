import {
  resetApprovedHosts,
  resetConnections,
} from '../../../../app/actions/sdk';
import { store } from '../../../../app/store';
import AppConstants from '../../../core/AppConstants';
import SDKConnect from '../SDKConnect';

/**
 * Invalidates and cleans up a specific SDK connection channel.
 * Removes the channel from approved hosts, connecting state, and active connections,
 * then dispatches Redux actions to update the global state.
 *
 * @param params - The invalidation parameters
 * @param params.channelId - The unique identifier of the channel to invalidate
 * @param params.instance - The SDKConnect instance managing the connections
 */
function invalidateChannel({
  channelId,
  instance,
}: {
  channelId: string;
  instance: SDKConnect;
}) {
  const host = AppConstants.MM_SDK.SDK_REMOTE_ORIGIN + channelId;

  instance.state.disabledHosts[host] = 0;

  delete instance.state.approvedHosts[host];
  delete instance.state.connecting[channelId];
  delete instance.state.connections[channelId];

  store.dispatch(resetApprovedHosts(instance.state.approvedHosts));
  store.dispatch(resetConnections(instance.state.connections));
}

export default invalidateChannel;
