import { OriginatorInfo } from '@metamask/sdk-communication-layer';
import { resetConnections } from '../../../../app/actions/sdk';
import { store } from '../../../../app/store';
import SDKConnect from '../SDKConnect';
import DevLogger from '../utils/DevLogger';

/**
 * Updates the originator information for a specific SDK connection channel.
 * This function modifies the connection state to include updated originator info
 * and marks the connection as active.
 *
 * @param params - The update parameters
 * @param params.channelId - The unique identifier for the connection channel
 * @param params.originatorInfo - The updated originator information from the SDK
 * @param params.instance - The SDKConnect instance managing the connections
 */
function updateOriginatorInfos({
  channelId,
  originatorInfo,
  instance,
}: {
  channelId: string;
  originatorInfo: OriginatorInfo;
  instance: SDKConnect;
}) {
  if (!instance.state.connections[channelId]) {
    console.warn(`SDKConnect::updateOriginatorInfos - no connection`);
    return;
  }

  // update originatorInfo
  instance.state.connections[channelId] = {
    ...instance.state.connections[channelId],
    originatorInfo,
    connected: true,
  };

  DevLogger.log(
    `SDKConnect::updateOriginatorInfos`,
    instance.state.connections,
  );
  store.dispatch(resetConnections(instance.state.connections));
}

export default updateOriginatorInfos;
