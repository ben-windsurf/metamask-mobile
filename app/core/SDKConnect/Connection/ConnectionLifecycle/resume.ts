import DevLogger from '../../utils/DevLogger';
import { Connection } from '../Connection';

/**
 * Resumes a paused SDK connection and updates its state.
 *
 * @param params - The resume parameters
 * @param params.instance - The Connection instance to resume
 */
function resume({ instance }: { instance: Connection }) {
  DevLogger.log(`Connection::resume() id=${instance.channelId}`);

  instance.remote.resume();

  instance.isResumed = true;

  instance.setLoading(false);
}

/**
 * Resumes a paused SDK connection and updates its state.
 *
 * @param params - The resume parameters
 * @param params.instance - The Connection instance to resume
 */
export default resume;
