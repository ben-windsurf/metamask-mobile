/**
 * Section identifier for IPFS gateway settings in the MetaMask Mobile settings
 */
export const IPFS_GATEWAY_SECTION = 'IPFS_GATEWAY_SECTION';

/**
 * Test IPFS hash used to validate gateway connectivity and functionality
 * Points to a test file for checking if the IPFS gateway is working correctly
 */
export const HASH_TO_TEST = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

/**
 * Expected content string when fetching the test IPFS hash
 * Used to verify that the IPFS gateway is returning the correct content
 */
export const HASH_STRING = 'Hello from IPFS Gateway Checker';

/**
 * Event identifier for IPFS gateway selection analytics tracking
 * Used to track when users select a different IPFS gateway in settings
 */
export const IPFS_GATEWAY_SELECTED = 'ipfs-gateway-selected';
