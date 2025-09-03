import useSDKMethod from './useSDKMethod';
import { useRampSDK } from '../sdk';

/**
 * Custom hook for managing transaction limits in the Ramp aggregator
 * Provides limit validation functions and current limit data based on selected region, payment method, and asset
 * @returns {Object} Object containing limits data and validation functions
 */
const useLimits = () => {
  const {
    selectedRegion,
    selectedPaymentMethodId,
    selectedAsset,
    selectedFiatCurrencyId,
    isBuy,
  } = useRampSDK();

  const [{ data: limits }] = useSDKMethod(
    isBuy ? 'getLimits' : 'getSellLimits',
    selectedRegion?.id,
    selectedPaymentMethodId ? [selectedPaymentMethodId] : null,
    selectedAsset?.id,
    selectedFiatCurrencyId,
  );

  /**
   * Checks if the provided amount is below the minimum limit
   * @param {number} amount - The amount to validate
   * @returns {boolean} True if amount is below minimum, false otherwise
   */
  const isAmountBelowMinimum = (amount: number) =>
    Boolean(amount !== 0 && limits?.minAmount && amount < limits.minAmount);

  /**
   * Checks if the provided amount is above the maximum limit
   * @param {number} amount - The amount to validate
   * @returns {boolean} True if amount is above maximum, false otherwise
   */
  const isAmountAboveMaximum = (amount: number) =>
    Boolean(amount !== 0 && limits?.maxAmount && amount > limits.maxAmount);

  /**
   * Validates if the provided amount is within the allowed limits
   * @param {number} amount - The amount to validate
   * @returns {boolean} True if amount is valid (within limits), false otherwise
   */
  const isAmountValid = (amount: number) =>
    !isAmountBelowMinimum(amount) && !isAmountAboveMaximum(amount);

  return {
    limits,
    isAmountBelowMinimum,
    isAmountAboveMaximum,
    isAmountValid,
  };
};

export default useLimits;
