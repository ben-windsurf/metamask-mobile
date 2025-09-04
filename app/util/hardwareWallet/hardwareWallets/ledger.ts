import { createNavigationDetails } from '../../navigation/navUtils';
import Routes from '../../../constants/navigation/Routes';
import { getDeviceId } from '../../../core/Ledger/Ledger';

/**
 * Navigation parameters for Ledger signing modal.
 * Contains the necessary data to initiate a Ledger hardware wallet signing process.
 */
export interface LedgerSignModelNavParams {
  /** Message parameters for the signing request */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageParams: any;
  /** Callback function executed when signing confirmation is complete */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirmationComplete: (confirmed: boolean, rawSignature?: any) => void;
  /** Version information for the signing request */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  version: any;
  /** Type of the signing request */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
}

/**
 * Extended navigation parameters for Ledger message signing modal.
 * Includes device identification in addition to base signing parameters.
 */
export interface LedgerMessageSignModalParams extends LedgerSignModelNavParams {
  /** Unique identifier for the Ledger device */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deviceId: any;
}

/**
 * Creates navigation details for the Ledger signing modal.
 * Retrieves the device ID and combines it with the provided parameters.
 *
 * @param params - The base navigation parameters for Ledger signing
 * @returns Promise resolving to navigation details with device ID included
 */
export const signModalNavDetail = async (params: LedgerSignModelNavParams) => {
  const deviceId = await getDeviceId();
  return createNavigationDetails<LedgerMessageSignModalParams>(
    Routes.LEDGER_MESSAGE_SIGN_MODAL,
  )({
    ...params,
    deviceId,
  });
};
