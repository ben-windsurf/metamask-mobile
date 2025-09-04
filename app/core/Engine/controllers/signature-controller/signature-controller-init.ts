import {
  SignatureController,
  type SignatureControllerMessenger,
  type SignatureControllerOptions,
} from '@metamask/signature-controller';
import type {
  ControllerInitFunction,
  ControllerInitRequest,
} from '../../types';
import { trace } from '../../../../util/trace';
import AppConstants from '../../../AppConstants';
import Logger from '../../../../util/Logger';

/**
 * Initializes the SignatureController with the required configuration and dependencies.
 * This controller handles signature requests and decoding operations for the MetaMask engine.
 *
 * @param request - The controller initialization request containing messenger and persisted state
 * @returns Object containing the initialized SignatureController instance
 */
export const SignatureControllerInit: ControllerInitFunction<
  SignatureController,
  SignatureControllerMessenger
> = (request) => {
  const { controllerMessenger, persistedState } = request;
  const { preferencesController } = getControllers(request);

  try {
    const signatureController = new SignatureController({
      decodingApiUrl: AppConstants.DECODING_API_URL,
      isDecodeSignatureRequestEnabled: () =>
        preferencesController.state.useTransactionSimulations,
      messenger: controllerMessenger,
      // @ts-expect-error - TODO: Not marked as Partial in signature-controller, SignatureControllerOptions needs to be updated
      state: persistedState.SignatureController,
      trace: trace as unknown as SignatureControllerOptions['trace'],
    });

    return { controller: signatureController };
  } catch (error) {
    Logger.error(error as Error, 'Failed to initialize SignatureController');
    throw error;
  }
};

/**
 * Retrieves the required controller dependencies for the SignatureController.
 *
 * @param request - The controller initialization request
 * @returns Object containing the PreferencesController instance
 */
function getControllers(
  request: ControllerInitRequest<SignatureControllerMessenger>,
) {
  return {
    preferencesController: request.getController('PreferencesController'),
  };
}
