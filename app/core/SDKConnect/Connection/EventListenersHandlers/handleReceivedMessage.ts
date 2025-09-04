import { CommunicationLayerMessage } from '@metamask/sdk-communication-layer';
import Logger from '../../../../util/Logger';
import Engine from '../../../Engine';
import { handleConnectionMessage } from '../../handlers/handleConnectionMessage';
import { Connection } from '../Connection';

/**
 * Creates a message handler function for processing received messages from the SDK communication layer.
 * This handler processes incoming messages and delegates to the connection message handler.
 *
 * @param params - Configuration object
 * @param params.instance - The Connection instance to handle messages for
 * @returns An async function that processes CommunicationLayerMessage objects
 */
function handleReceivedMessage({ instance }: { instance: Connection }) {
  return async (message: CommunicationLayerMessage) => {
    try {
      await handleConnectionMessage({
        message,
        engine: Engine,
        connection: instance,
      });
    } catch (error) {
      Logger.error(error as Error, 'Connection not initialized');
      throw error;
    }
  };
}

/**
 * Default export of the message handler factory function.
 * Used to create message handlers for SDK connections.
 */
export default handleReceivedMessage;
