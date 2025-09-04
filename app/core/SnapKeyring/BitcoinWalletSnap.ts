///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
import { SnapId } from '@metamask/snaps-sdk';
import { Sender } from '@metamask/keyring-snap-client';
import { HandlerType } from '@metamask/snaps-utils';
import { Json, JsonRpcRequest } from '@metamask/utils';
import { handleSnapRequest } from '../Snaps/utils';
import Engine from '../Engine';

/**
 * The unique identifier for the Bitcoin wallet snap package.
 * This snap provides Bitcoin wallet functionality within MetaMask.
 */
export const BITCOIN_WALLET_SNAP_ID: SnapId =
  'npm:@metamask/bitcoin-wallet-snap' as SnapId;

/**
 * The display name for the Bitcoin wallet snap.
 */
export const BITCOIN_WALLET_NAME: string = 'Bitcoin';

/**
 * Sender implementation for communicating with the Bitcoin wallet snap.
 * This class handles JSON-RPC requests to the Bitcoin wallet snap through
 * the MetaMask snap system.
 *
 * @example
 * ```typescript
 * const sender = new BitcoinWalletSnapSender();
 * const response = await sender.send({
 *   method: 'btc_getPublicKey',
 *   params: { path: "m/44'/0'/0'/0/0" }
 * });
 * ```
 */
export class BitcoinWalletSnapSender implements Sender {
  /**
   * Sends a JSON-RPC request to the Bitcoin wallet snap.
   *
   * @param request - The JSON-RPC request to send to the snap
   * @returns Promise that resolves to the snap's response
   * @throws Will throw an error if the snap is not installed or the request fails
   */
  send = async (request: JsonRpcRequest): Promise<Json> =>
    (await handleSnapRequest(Engine.controllerMessenger, {
      origin: 'metamask',
      snapId: BITCOIN_WALLET_SNAP_ID,
      handler: HandlerType.OnKeyringRequest,
      request,
    })) as Json;
}
///: END:ONLY_INCLUDE_IF
