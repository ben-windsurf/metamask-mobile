import { HandlerType } from '@metamask/snaps-utils';
import { handleSnapRequest } from '../../Snaps/utils';
import Engine from '../../Engine';
import { SnapId, CaipAssetType } from '@metamask/snaps-sdk';

/** Controller messenger instance from the Engine singleton */
const controllerMessenger = Engine.controllerMessenger;

/**
 * Initiates a multichain transaction flow through a Snap keyring.
 * This function handles the communication with a Snap to start a transaction
 * flow for multichain operations.
 *
 * @param snapId - The ID of the Snap to handle the transaction
 * @param params - Transaction parameters
 * @param params.account - The account address to send the transaction from
 * @param params.scope - The scope/chain identifier for the transaction
 * @param params.assetId - Optional CAIP asset type identifier
 * @returns Promise that resolves when the transaction flow is initiated
 */
export async function sendMultichainTransaction(
  snapId: SnapId,
  {
    account,
    scope,
    assetId,
  }: {
    account: string;
    scope: string;
    assetId?: CaipAssetType;
  },
) {
  await handleSnapRequest(controllerMessenger, {
    snapId,
    origin: 'metamask',
    handler: HandlerType.OnRpcRequest,
    request: {
      method: 'startSendTransactionFlow',
      params: {
        account,
        scope,
        assetId,
      },
    },
  });
}
