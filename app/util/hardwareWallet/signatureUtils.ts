import { handleSignatureAction } from '../confirmation/signatureUtils';
import { getKeyringByAddress } from '../address';
import { signModalNavDetail } from './hardwareWallets/ledger';
import ExtendedKeyringTypes from '../../constants/keyringTypes';

/**
 * Factory map for navigation methods based on keyring types.
 * Maps each extended keyring type to its corresponding navigation method.
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navMethodFactory = new Map<ExtendedKeyringTypes, any>();
navMethodFactory.set(ExtendedKeyringTypes.ledger, signModalNavDetail);

/**
 * Handles signature operations for hardware wallets by routing to the appropriate
 * navigation method based on the keyring type associated with the signing address.
 *
 * @param onReject - Callback function to execute when signature is rejected
 * @param onConfirm - Callback function to execute when signature is confirmed
 * @param messageParams - Parameters for the message to be signed
 * @param signType - Type of signature operation being performed
 * @returns Promise that resolves with the navigation result
 * @throws Error if keyring is not found or keyring type is not supported
 */
export default async (
  onReject: () => void,
  onConfirm: () => void,
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageParams: any,
  signType: string,
) => {
  const keyring = getKeyringByAddress(messageParams.from);

  const onConfirmationComplete = async (confirmed: boolean) => {
    if (!confirmed) {
      await handleSignatureAction(onReject, messageParams, signType, false);
    } else {
      await handleSignatureAction(onConfirm, messageParams, signType, true);
    }
  };

  if (!keyring) {
    throw new Error(`Keyring not found for address ${messageParams.from}`);
  }

  const navPromise = navMethodFactory.get(keyring.type as ExtendedKeyringTypes);

  if (navPromise === undefined) {
    throw new Error(
      `Keyring type ${keyring.type} not supported for signature redirect navigation`,
    );
  }

  return await navPromise({
    messageParams,
    onConfirmationComplete,
    type: signType,
  });
};
