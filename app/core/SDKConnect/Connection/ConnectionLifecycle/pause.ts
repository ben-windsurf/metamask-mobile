import { Connection } from '../Connection';

/**
 * Pauses a connection instance by calling the remote pause method and updating the resumed state.
 * This function is used to temporarily halt communication with a remote connection.
 *
 * @param params - The parameters object
 * @param params.instance - The Connection instance to pause
 */
function pause({ instance }: { instance: Connection }) {
  instance.remote.pause();
  instance.isResumed = false;
}

export default pause;
