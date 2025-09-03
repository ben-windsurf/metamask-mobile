import { ethers } from 'ethers';
import balanceScannerAbi from './sdk/balanceScannerAbi.json';

/**
 * ABI interface for the balance scanner contract
 * Used for querying token balances across multiple contracts
 */
export const BALANCE_SCANNER_ABI =
  balanceScannerAbi as ethers.ContractInterface;

/**
 * Arbitrary large allowance value used for token approvals
 * Represents a very high number to effectively grant unlimited spending permission
 */
export const ARBITRARY_ALLOWANCE = 100000000000;
