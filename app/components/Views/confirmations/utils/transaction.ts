import { ORIGIN_METAMASK } from '@metamask/controller-utils';
import { Interface } from '@ethersproject/abi';
import {
  TransactionMeta,
  TransactionParams,
  TransactionType,
} from '@metamask/transaction-controller';
import {
  abiERC721,
  abiERC20,
  abiERC1155,
  abiFiatTokenV2,
} from '@metamask/metamask-eth-abis';

import ppomUtil from '../../../../lib/ppom/ppom-util';
import { addTransaction } from '../../../../util/transaction-controller';

const erc20Interface = new Interface(abiERC20);
const erc721Interface = new Interface(abiERC721);
const erc1155Interface = new Interface(abiERC1155);
const USDCInterface = new Interface(abiFiatTokenV2);

const ABI_PERMIT_2_APPROVE = {
  inputs: [
    { internalType: 'address', name: 'token', type: 'address' },
    { internalType: 'address', name: 'spender', type: 'address' },
    { internalType: 'uint160', name: 'amount', type: 'uint160' },
    { internalType: 'uint48', name: 'expiration', type: 'uint48' },
  ],
  name: 'approve',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function',
};
const permit2Interface = new Interface([ABI_PERMIT_2_APPROVE]);

/**
 * Parses transaction data to identify standard token operations (ERC20, ERC721, ERC1155, USDC, Permit2)
 * Attempts to decode transaction data using various token contract ABIs to determine the transaction type
 * @param {string} [data] - The transaction data to parse
 * @returns {Object|undefined} Parsed transaction object or undefined if parsing fails
 */
export function parseStandardTokenTransactionData(data?: string) {
  if (!data) {
    return undefined;
  }

  try {
    return erc20Interface.parseTransaction({ data });
  } catch {
    // ignore and next try to parse with erc721 ABI
  }

  try {
    return erc721Interface.parseTransaction({ data });
  } catch {
    // ignore and next try to parse with erc1155 ABI
  }

  try {
    return erc1155Interface.parseTransaction({ data });
  } catch {
    // ignore and return undefined
  }

  try {
    return USDCInterface.parseTransaction({ data });
  } catch {
    // ignore and return undefined
  }

  try {
    return permit2Interface.parseTransaction({ data });
  } catch {
    // ignore and return undefined
  }

  return undefined;
}

/**
 * Adds a MetaMask-originated transaction to the transaction controller and validates it with PPOM
 * Creates a transaction with MetaMask as the origin and performs security validation
 * @param {TransactionParams} txParams - The transaction parameters
 * @param {Object} options - Transaction options
 * @param {string} options.networkClientId - The network client ID for the transaction
 * @param {TransactionType} [options.type] - Optional transaction type
 * @returns {Promise<TransactionMeta>} Promise resolving to the created transaction metadata
 */
export async function addMMOriginatedTransaction(
  txParams: TransactionParams,
  options: {
    networkClientId: string;
    type?: TransactionType;
  },
): Promise<TransactionMeta> {
  const { transactionMeta } = await addTransaction(txParams, {
    ...options,
    origin: ORIGIN_METAMASK,
  });

  const id = transactionMeta.id;
  const reqObject = {
    id,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    origin: ORIGIN_METAMASK,
    params: [txParams],
  };

  ppomUtil.validateRequest(reqObject, { transactionMeta });

  return transactionMeta;
}

/**
 * Extracts the 4-byte function selector from transaction data
 * Used to identify the function being called in a smart contract transaction
 * @param {string} data - The transaction data hex string
 * @returns {string} The 4-byte function selector in lowercase
 */
export function get4ByteCode(data: string) {
  return data.slice(0, 10).toLowerCase();
}
