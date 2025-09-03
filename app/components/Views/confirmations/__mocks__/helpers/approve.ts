import { Hex } from '@metamask/utils';
import { Interface } from '@ethersproject/abi';

/**
 * Builds transaction data for ERC-20/ERC-721 approve function calls
 * Creates encoded function data for approving token spending or NFT transfers
 * @param {string} address - The spender address to approve
 * @param {number} amountOrTokenId - The amount to approve (ERC-20) or token ID (ERC-721)
 * @returns {Hex} Encoded transaction data for the approve function call
 */
export function buildApproveTransactionData(
  address: string,
  amountOrTokenId: number,
): Hex {
  return new Interface([
    'function approve(address spender, uint256 amountOrTokenId)',
  ]).encodeFunctionData('approve', [address, amountOrTokenId]) as Hex;
}

/**
 * Builds transaction data for Permit2 approve function calls
 * Creates encoded function data for Permit2 token approvals with expiration
 * @param {string} token - The token contract address
 * @param {string} spender - The spender address to approve
 * @param {number} amount - The amount to approve
 * @param {number} expiration - The approval expiration timestamp
 * @returns {Hex} Encoded transaction data for the Permit2 approve function call
 */
export function buildPermit2ApproveTransactionData(
  token: string,
  spender: string,
  amount: number,
  expiration: number,
): Hex {
  return new Interface([
    'function approve(address token, address spender, uint160 amount, uint48 nonce)',
  ]).encodeFunctionData('approve', [token, spender, amount, expiration]) as Hex;
}

/**
 * Builds transaction data for decreaseAllowance function calls
 * Creates encoded function data for reducing token spending allowances
 * @param {string} address - The spender address whose allowance to decrease
 * @param {number} amount - The amount to decrease the allowance by
 * @returns {Hex} Encoded transaction data for the decreaseAllowance function call
 */
export function buildDecreaseAllowanceTransactionData(
  address: string,
  amount: number,
): Hex {
  return new Interface([
    'function decreaseAllowance(address spender, uint256 subtractedValue)',
  ]).encodeFunctionData('decreaseAllowance', [address, amount]) as Hex;
}

/**
 * Builds transaction data for increaseAllowance function calls
 * Creates encoded function data for increasing token spending allowances
 * @param {string} address - The spender address whose allowance to increase
 * @param {number} amount - The amount to increase the allowance by
 * @returns {Hex} Encoded transaction data for the increaseAllowance function call
 */
export function buildIncreaseAllowanceTransactionData(
  address: string,
  amount: number,
): Hex {
  return new Interface([
    'function increaseAllowance(address spender, uint256 addedValue)',
  ]).encodeFunctionData('increaseAllowance', [address, amount]) as Hex;
}

/**
 * Builds transaction data for setApprovalForAll function calls
 * Creates encoded function data for approving/revoking operator permissions for all NFTs
 * @param {string} address - The operator address to approve or revoke
 * @param {boolean} approved - Whether to approve (true) or revoke (false) the operator
 * @returns {Hex} Encoded transaction data for the setApprovalForAll function call
 */
export function buildSetApproveForAllTransactionData(
  address: string,
  approved: boolean,
): Hex {
  return new Interface([
    'function setApprovalForAll(address operator, bool approved)',
  ]).encodeFunctionData('setApprovalForAll', [address, approved]) as Hex;
}
