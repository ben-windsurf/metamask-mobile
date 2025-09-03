/**
 * Available DeFi position types for portfolio tracking
 * Defines the different types of positions a user can have in DeFi protocols
 */
export const PositionTypes = ['supply', 'stake', 'borrow', 'reward'] as const;

/**
 * Type definition for DeFi position types
 * Union type of all available position types
 */
export type PositionType = (typeof PositionTypes)[number];
