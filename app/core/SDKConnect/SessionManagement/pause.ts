import { disconnectAll } from '../../../../app/actions/sdk';
import SDKConnect from '../SDKConnect';
import DevLogger from '../utils/DevLogger';
import { store } from '../../../../app/store';

/**
 * Pauses all active SDK connections and sets the instance to paused state.
 * This function iterates through all connected instances, pauses active connections,
 * and dispatches a disconnectAll action to update the Redux store.
 *
 * @param instance - The SDKConnect instance to pause
 */
function pause(instance: SDKConnect) {
  if (instance.state.paused) return;

  for (const id in instance.state.connected) {
    if (!instance.state.connected[id].remote.isReady()) {
      DevLogger.log(`SDKConnect::pause - SKIP - non active connection ${id}`);
      continue;
    }
    DevLogger.log(`SDKConnect::pause - pausing ${id}`);
    instance.state.connected[id].pause();
    // check for paused status?
    DevLogger.log(
      `SDKConnect::pause - done - paused=${instance.state.connected[
        id
      ].remote.isPaused()}`,
    );
  }
  instance.state.paused = true;
  instance.state.connecting = {};
  // Set disconnected status for all connections
  store.dispatch(disconnectAll());
}

/**
 * Pauses all active SDK connections and sets the instance to paused state.
 * This function iterates through all connected instances, pauses active connections,
 * and dispatches a disconnectAll action to update the Redux store.
 */
export default pause;
