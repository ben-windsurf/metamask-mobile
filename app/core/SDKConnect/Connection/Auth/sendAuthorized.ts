import { MessageType } from '@metamask/sdk-communication-layer';
import Logger from '../../../../util/Logger';
import { Connection } from '../Connection';

/**
 * Sends an authorized message to the remote connection if not already sent.
 * Prevents duplicate authorized events from being sent to the same connection.
 *
 * @param params - The parameters object
 * @param params.force - Whether to force sending even if already sent
 * @param params.instance - The connection instance to send the message through
 */
function sendAuthorized({
  force,
  instance,
}: {
  force?: boolean;
  instance: Connection;
}) {
  if (instance.authorizedSent && force !== true) {
    // Prevent double sending authorized event.
    return;
  }

  instance.remote
    .sendMessage({ type: MessageType.AUTHORIZED })
    .then(() => {
      instance.authorizedSent = true;
    })
    .catch((err) => {
      Logger.log(err, `sendAuthorized() failed to send 'authorized'`);
    });
}

export default sendAuthorized;
