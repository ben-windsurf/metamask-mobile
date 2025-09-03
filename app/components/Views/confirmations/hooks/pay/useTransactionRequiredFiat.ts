import { Hex, createProjectLogger } from '@metamask/utils';
import { BigNumber } from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useTransactionMetadataOrThrow } from '../transactions/useTransactionMetadataRequest';
import { useTransactionRequiredTokens } from './useTransactionRequiredTokens';
import { useTokenFiatRates } from '../tokens/useTokenFiatRates';
import { selectTokensByChainIdAndAddress } from '../../../../../selectors/tokensController';
import { useSelector } from 'react-redux';
import { useDeepMemo } from '../useDeepMemo';

const log = createProjectLogger('transaction-pay');

/**
 * Slippage tolerance for bridge transactions in MetaMask Pay
 * Applied as a percentage (2%) to account for price movement during bridging
 */
export const PAY_BRIDGE_SLIPPAGE = 0.02;

/**
 * Bridge fee percentage for MetaMask Pay transactions
 * Applied as a percentage (0.5%) for bridge operation costs
 */
export const PAY_BRIDGE_FEE = 0.005;

/**
 * Calculate the fiat value of any tokens required by the transaction.
 * Necessary for MetaMask Pay to calculate how much of the selected pay token is needed.
 * @returns {Object} Object containing fiatTotal and fiatValues for required tokens
 * @returns {number} returns.fiatTotal - Total fiat value of all required tokens
 * @returns {(number|undefined)[]} returns.fiatValues - Array of individual token fiat values
 */
export function useTransactionRequiredFiat() {
  const transactionMeta = useTransactionMetadataOrThrow();
  const { chainId } = transactionMeta;
  const requiredTokens = useTransactionRequiredTokens();

  const tokens = useSelector((state) =>
    selectTokensByChainIdAndAddress(state, chainId),
  );

  const fiatRequests = useMemo(
    () =>
      requiredTokens.map((token) => ({
        address: token.address,
        chainId,
      })),
    [requiredTokens, chainId],
  );

  const tokenFiatRates = useTokenFiatRates(fiatRequests);

  const tokenDecimals = useMemo(
    () =>
      requiredTokens.map(
        (token) => tokens[token.address.toLowerCase()]?.decimals ?? 18,
      ),
    [requiredTokens, tokens],
  );

  const fiatValues = useDeepMemo(
    () =>
      requiredTokens.map((target, index) => {
        const targetDecimals = tokenDecimals?.[index];
        const targetFiatRate = tokenFiatRates?.[index];

        if (!targetFiatRate) {
          return undefined;
        }

        return calculateFiat(target.amount, targetDecimals, targetFiatRate);
      }),
    [requiredTokens, tokenDecimals, tokenFiatRates],
  );

  const fiatTotal = fiatValues.reduce<number>(
    (acc, value) => acc + (value ?? 0),
    0,
  );

  useEffect(() => {
    log('Required fiat values', {
      fiatValues,
      fiatTotal,
    });
  }, [fiatValues, fiatTotal]);

  return {
    fiatTotal,
    fiatValues,
  };
}

/**
 * Calculates the fiat value of a token amount including bridge fees and slippage
 * @param {Hex} amountRaw - Raw token amount in hexadecimal format
 * @param {number} decimals - Number of decimal places for the token
 * @param {number} fiatRate - Current fiat exchange rate for the token
 * @returns {number} Fiat value including fees and slippage tolerance
 */
function calculateFiat(amountRaw: Hex, decimals: number, fiatRate: number) {
  const amountDecimals = new BigNumber(amountRaw, 16).shiftedBy(-decimals);

  const amountFiat = amountDecimals.multipliedBy(fiatRate);

  const amountFiatWithFees = amountFiat
    .multipliedBy(1 + PAY_BRIDGE_SLIPPAGE + PAY_BRIDGE_FEE)
    .toNumber();

  return amountFiatWithFees;
}
