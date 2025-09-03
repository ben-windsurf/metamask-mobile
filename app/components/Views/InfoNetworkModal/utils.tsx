import { InteractionManager } from 'react-native';
import { toggleInfoNetworkModal } from '../../../actions/modals';
import { AnyAction, Dispatch } from 'redux';

/**
 * Handles network switching logic and displays info modal for new networks
 * Shows the network information modal when switching to a network that hasn't been onboarded
 * and the user is not currently on the bridge route
 * @param {Dispatch<AnyAction>} dispatch - Redux dispatch function for triggering actions
 * @param {boolean} networkOnboarded - Whether the current network has been onboarded by the user
 * @param {boolean} isOnBridgeRoute - Whether the user is currently on the bridge route
 */
export const handleNetworkSwitch = (
  dispatch: Dispatch<AnyAction>,
  networkOnboarded: boolean,
  isOnBridgeRoute: boolean,
) => {
  if (!networkOnboarded && !isOnBridgeRoute) {
    InteractionManager.runAfterInteractions(() => {
      dispatch(toggleInfoNetworkModal(true));
    });
  }
};
