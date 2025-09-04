import { OriginatorInfo } from '@metamask/sdk-communication-layer';
import Routes from '../../../../constants/navigation/Routes';
import AppConstants from '../../../../core/AppConstants';
import Logger from '../../../../util/Logger';
import Engine from '../../../Engine';
import SDKConnect, { approveHostProps } from '../../SDKConnect';
import handleConnectionReady from '../../handlers/handleConnectionReady';
import DevLogger from '../../utils/DevLogger';
import { Connection } from '../Connection';

/**
 * Creates a handler function for processing clients ready events in SDK connections.
 * This function manages the connection establishment process when clients signal they are ready.
 *
 * @param params - Configuration object for the handler
 * @param params.instance - The connection instance to handle
 * @param params.disapprove - Function to disapprove a connection by channel ID
 * @param params.updateOriginatorInfos - Function to update originator information
 * @param params.approveHost - Function to approve host connections
 * @returns A handler function that processes clients ready messages
 *
 * @example
 * ```typescript
 * const handler = handleClientsReady({
 *   instance: connectionInstance,
 *   disapprove: (channelId) => console.log('Disapproved:', channelId),
 *   updateOriginatorInfos: ({ channelId, originatorInfo }) => updateInfo(channelId, originatorInfo),
 *   approveHost: (props) => approveConnection(props)
 * });
 * ```
 */
function handleClientsReady({
  instance,
  disapprove,
  updateOriginatorInfos,
  approveHost,
}: {
  instance: Connection;
  disapprove: (channelId: string) => void;
  updateOriginatorInfos: (params: {
    channelId: string;
    originatorInfo: OriginatorInfo;
  }) => void;
  approveHost: (props: approveHostProps) => void;
}) {
  return async (clientsReadyMsg: { originatorInfo: OriginatorInfo }) => {
    try {
      await handleConnectionReady({
        originatorInfo:
          clientsReadyMsg?.originatorInfo ?? instance.originatorInfo,
        engine: Engine,
        updateOriginatorInfos,
        approveHost,
        onError: (error) => {
          Logger.error(error as Error, '');

          instance.setLoading(false);

          // Remove connection from SDK completely
          SDKConnect.getInstance().removeChannel({
            channelId: instance.channelId,
            sendTerminate: true,
          });

          // Redirect on deeplinks
          if (
            instance.trigger === 'deeplink' &&
            instance.origin !== AppConstants.DEEPLINKS.ORIGIN_QR_CODE
          ) {
            instance.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
              screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
            });
          }
        },
        disapprove,
        connection: instance,
      });
    } catch (error) {
      DevLogger.log(`Connection::CLIENTS_READY error`, error);
      instance.setLoading(false);
      // Send error message to user
    }
  };
}

export default handleClientsReady;
