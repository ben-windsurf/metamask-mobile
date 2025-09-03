///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
import { SnapId } from '@metamask/snaps-sdk';
import { Sender } from '@metamask/keyring-snap-client';
import { HandlerType } from '@metamask/snaps-utils';
import { Json, JsonRpcRequest } from '@metamask/utils';
import { handleSnapRequest } from '../Snaps/utils';
import Engine from '../Engine';

/**
 * The unique identifier for the Bitcoin Wallet Snap
 * Used to identify and communicate with the Bitcoin wallet functionality
 */
export const BITCOIN_WALLET_SNAP_ID: SnapId =
  'npm:@metamask/bitcoin-wallet-snap' as SnapId;

/**
 * Display name for the Bitcoin wallet
 * Used in UI components and user-facing messages
 */
export const BITCOIN_WALLET_NAME: string = 'Bitcoin';

/**
 * Bitcoin Wallet Snap sender implementation for keyring operations
 * Handles communication between MetaMask Mobile and the Bitcoin Wallet Snap
 * Implements the Sender interface to send JSON-RPC requests to the snap
 */
export class BitcoinWalletSnapSender implements Sender {
  // We assume the caller of this module is aware of this. If we try to use this module
  // without having the pre-installed Snap, this will likely throw an error in
  // the `handleSnapRequest` action.
  send = async (request: JsonRpcRequest): Promise<Json> =>
    (await handleSnapRequest(Engine.controllerMessenger, {
      origin: 'metamask',
      snapId: BITCOIN_WALLET_SNAP_ID,
      handler: HandlerType.OnKeyringRequest,
      request,
    })) as Json;
}
///: END:ONLY_INCLUDE_IF
