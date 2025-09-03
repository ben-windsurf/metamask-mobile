import type { ControllerInitFunction } from '../../types';
import {
  PerpsController,
  PerpsControllerMessenger,
  getDefaultPerpsControllerState,
} from '../../../../components/UI/Perps/controllers';

/**
 * Initialize the PerpsController for managing perpetual trading functionality.
 * Creates and configures a new PerpsController instance with the provided messenger
 * and persisted state, enabling perpetual contract trading features in MetaMask Mobile.
 *
 * @param request - The controller initialization request containing messenger and state
 * @param request.controllerMessenger - The messenger for inter-controller communication
 * @param request.persistedState - Previously saved controller state data
 * @returns Object containing the initialized PerpsController instance
 */
export const perpsControllerInit: ControllerInitFunction<
  PerpsController,
  PerpsControllerMessenger
> = (request) => {
  const { controllerMessenger, persistedState } = request;

  const perpsControllerState =
    persistedState.PerpsController ?? getDefaultPerpsControllerState();

  const controller = new PerpsController({
    messenger: controllerMessenger,
    state: perpsControllerState,
  });

  return { controller };
};
