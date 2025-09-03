import { useEffect, useMemo } from 'react';
import { useTransactionMaxGasCost } from '../gas/useTransactionMaxGasCost';
import { NATIVE_TOKEN_ADDRESS } from '../../constants/tokens';
import { Hex, add0x, createProjectLogger } from '@metamask/utils';
import { Interface } from '@ethersproject/abi';
import { abiERC20 } from '@metamask/metamask-eth-abis';
import { toHex } from '@metamask/controller-utils';
import { useTokensWithBalance } from '../../../../UI/Bridge/hooks/useTokensWithBalance';
import { BridgeToken } from '../../../../UI/Bridge/types';
import { BigNumber } from 'bignumber.js';
import { useTransactionMetadataOrThrow } from '../transactions/useTransactionMetadataRequest';
import { useDeepMemo } from '../useDeepMemo';

const log = createProjectLogger('transaction-pay');

export interface TransactionToken {
  address: Hex;
  amount: Hex;
}

/**
 * Determine what tokens are required by the transaction.
 * Necessary for MetaMask Pay to generate suitable bridge or swap transactions.
 */
export function useTransactionRequiredTokens() {
  const transactionMeta = useTransactionMetadataOrThrow();
  const { chainId } = transactionMeta;

  const balanceTokens = useTokensWithBalance({
    chainIds: [chainId],
  });

  const gasToken = useGasToken();
  const valueToken = useValueToken();
  const tokenTransferToken = useTokenTransferToken();

  const requiredTokens = useMemo(
    () =>
      [gasToken, valueToken, tokenTransferToken].filter(
        (t) => t,
      ) as TransactionToken[],
    [gasToken, valueToken, tokenTransferToken],
  );

  const finalTokens = getPartialTokens(
    getUniqueTokens(requiredTokens),
    balanceTokens,
    chainId,
  );

  const result = useDeepMemo(() => finalTokens, [finalTokens]);

  useEffect(() => {
    log('Required tokens', result);
  }, [result]);

  return result;
}

/**
 * Hook to extract token transfer information from transaction data
 * Decodes ERC-20 transfer function calls to determine required token amounts
 * @returns {TransactionToken | undefined} Token transfer details or undefined if not a token transfer
 */
function useTokenTransferToken(): TransactionToken | undefined {
  const transactionMetadata = useTransactionMetadataOrThrow();
  const { txParams } = transactionMetadata;
  const { data, to } = txParams;

  let transferAmount: Hex | undefined;

  try {
    const result = new Interface(abiERC20).decodeFunctionData(
      'transfer',
      data ?? '0x',
    );

    transferAmount = toHex(result._value);
  } catch {
    // Intentionally empty
  }

  return useMemo(() => {
    if (!transferAmount || !to) {
      return undefined;
    }

    return {
      address: to as Hex,
      amount: transferAmount,
    };
  }, [transferAmount, to]);
}

/**
 * Hook to extract native token value from transaction parameters
 * Returns the native token amount being sent in the transaction
 * @returns {TransactionToken | undefined} Native token value details or undefined if no value
 */
function useValueToken(): TransactionToken | undefined {
  const transactionMetadata = useTransactionMetadataOrThrow();
  const { txParams } = transactionMetadata;
  const { value } = txParams;

  return useMemo(() => {
    if (!value) {
      return undefined;
    }

    return {
      address: NATIVE_TOKEN_ADDRESS,
      amount: value as Hex,
    };
  }, [value]);
}

/**
 * Hook to calculate gas token requirements for the transaction
 * Returns the native token amount needed to cover gas costs
 * @returns {TransactionToken | undefined} Gas token requirements or undefined if no gas cost
 */
function useGasToken(): TransactionToken | undefined {
  const maxGasCost = useTransactionMaxGasCost() ?? '0x0';

  return useMemo(() => {
    if (maxGasCost === '0x0') {
      return undefined;
    }

    return { address: NATIVE_TOKEN_ADDRESS, amount: maxGasCost };
  }, [maxGasCost]);
}

/**
 * Calculates the partial token amounts needed based on current balances
 * Determines how much additional tokens are required for the transaction
 * @param {TransactionToken[]} tokens - Required tokens for the transaction
 * @param {BridgeToken[]} balanceTokens - Current token balances
 * @param {Hex} chainId - Chain ID for token matching
 * @returns {TransactionToken[]} Array of tokens with amounts needed to fulfill transaction
 */
function getPartialTokens(
  tokens: TransactionToken[],
  balanceTokens: BridgeToken[],
  chainId: Hex,
): TransactionToken[] {
  return tokens.reduce((acc, token) => {
    const balanceToken = balanceTokens.find(
      (t) =>
        t.address.toLowerCase() === token.address.toLowerCase() &&
        t.chainId === chainId,
    );

    if (!balanceToken?.balance) {
      acc.push({
        ...token,
      });

      return acc;
    }

    const { balance } = balanceToken;
    const decimals = balanceToken.decimals ?? 18;

    const requiredBalance = new BigNumber(token.amount, 16)
      .shiftedBy(-decimals)
      .minus(balance);

    const requiredBalanceRaw = add0x(
      requiredBalance.shiftedBy(decimals).toString(16),
    );

    if (requiredBalance.lte(0)) {
      return acc;
    }

    acc.push({
      ...token,
      amount: requiredBalanceRaw,
    });

    return acc;
  }, [] as TransactionToken[]);
}

/**
 * Consolidates duplicate tokens by combining their amounts
 * Merges tokens with the same address into single entries with summed amounts
 * @param {TransactionToken[]} targets - Array of transaction tokens to consolidate
 * @returns {TransactionToken[]} Array of unique tokens with combined amounts
 */
function getUniqueTokens(targets: TransactionToken[]): TransactionToken[] {
  return targets.reduce((acc, target) => {
    const existingToken = acc.find(
      (t) => t.address.toLowerCase() === target.address.toLowerCase(),
    );

    if (existingToken) {
      existingToken.amount = add0x(
        new BigNumber(existingToken.amount, 16)
          .plus(new BigNumber(target.amount, 16))
          .toString(16),
      );
    } else {
      acc.push({ ...target });
    }

    return acc;
  }, [] as TransactionToken[]);
}
