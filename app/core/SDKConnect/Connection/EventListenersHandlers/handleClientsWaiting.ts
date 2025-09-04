import DevLogger from '../../utils/DevLogger';
import { Connection } from '../Connection';

/**
 * Creates an event handler for when clients are waiting for a connection.
 * This handler logs the waiting state and sets the connection loading state to false.
 *
 * @param params - The parameters object
 * @param params.instance - The Connection instance to handle
 * @returns A function that handles the clients waiting event
 */
function handleClientsWaiting({ instance }: { instance: Connection }) {
  return () => {
    DevLogger.log(
      `handleClientsWaiting:: dapp not connected`,
      instance.channelId,
    );
    instance.setLoading(false);
    // TODO - validate connection behavior if disconnect or maintain. Keeping it for now
    // instance.disconnect({ terminate: false, context: 'CLIENTS_WAITING' });
  };
}

/**
 * Event handler factory for managing clients waiting state in SDK connections.
 * Used to handle scenarios where dApps are not yet connected but clients are waiting.
 */
export default handleClientsWaiting;
