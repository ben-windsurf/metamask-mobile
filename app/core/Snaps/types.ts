import { SnapId } from '@metamask/snaps-sdk';
import { SnapRpcHookArgs } from '@metamask/snaps-utils';

/**
 * Arguments for handling Snap RPC requests.
 * Extends the base SnapRpcHookArgs with a specific snapId identifier.
 */
export type HandleSnapRequestArgs = SnapRpcHookArgs & { snapId: SnapId };
