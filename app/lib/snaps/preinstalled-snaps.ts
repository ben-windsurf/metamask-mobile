import type { PreinstalledSnap } from '@metamask/snaps-controllers';
import MessageSigningSnap from '@metamask/message-signing-snap/dist/preinstalled-snap.json';
///: BEGIN:ONLY_INCLUDE_IF(solana)
import SolanaWalletSnap from '@metamask/solana-wallet-snap/dist/preinstalled-snap.json';
///: END:ONLY_INCLUDE_IF
///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
import BitcoinWalletSnap from '@metamask/bitcoin-wallet-snap/dist/preinstalled-snap.json';
///: END:ONLY_INCLUDE_IF
///: BEGIN:ONLY_INCLUDE_IF(flask)
import PreinstalledExampleSnap from '@metamask/preinstalled-example-snap/dist/preinstalled-snap.json';
///: END:ONLY_INCLUDE_IF

/**
 * Array of preinstalled snaps that are bundled with the MetaMask Mobile application.
 * These snaps are available immediately upon installation and provide core functionality
 * for various blockchain operations including message signing and wallet management.
 *
 * The array is frozen to prevent runtime modifications and ensure snap integrity.
 * Different snaps are conditionally included based on build flags for specific features.
 */
const PREINSTALLED_SNAPS: readonly PreinstalledSnap[] = Object.freeze([
  MessageSigningSnap as unknown as PreinstalledSnap,
  ///: BEGIN:ONLY_INCLUDE_IF(solana)
  SolanaWalletSnap as unknown as PreinstalledSnap,
  ///: END:ONLY_INCLUDE_IF
  ///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
  BitcoinWalletSnap as unknown as PreinstalledSnap,
  ///: END:ONLY_INCLUDE_IF
  ///: BEGIN:ONLY_INCLUDE_IF(flask)
  PreinstalledExampleSnap as unknown as PreinstalledSnap,
  ///: END:ONLY_INCLUDE_IF
]);

/**
 * Default export of preinstalled snaps configuration.
 *
 * @returns The frozen array of preinstalled snap configurations
 */
export default PREINSTALLED_SNAPS;
