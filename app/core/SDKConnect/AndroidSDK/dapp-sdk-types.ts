import { OriginatorInfo } from '@metamask/sdk-communication-layer';

/**
 * Represents a connected dApp client in the SDK connection system.
 * Contains information about the dApp's connection state and metadata.
 */
export interface DappClient {
  /** Information about the originator of the connection */
  originatorInfo: OriginatorInfo;
  /** Unique identifier for the client connection */
  clientId: string;
  /** Whether the client is currently connected */
  connected: boolean;
  /** Optional timestamp when the connection expires */
  validUntil?: number;
  /** Optional URL scheme for deep linking */
  scheme?: string;
}

/**
 * Map of dApp connections indexed by client ID.
 * Used to track multiple concurrent dApp connections.
 */
export interface DappConnections {
  [clientId: string]: DappClient;
}
