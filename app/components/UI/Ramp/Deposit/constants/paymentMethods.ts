import {
  IconColor,
  IconName,
} from '../../../../../component-library/components/Icons/Icon/index.ts';
import { brandColor } from '@metamask/design-tokens';
import { AppThemeKey } from '../../../../../util/theme/models.ts';

export interface DepositPaymentMethod {
  id: string;
  name: string;
  duration: 'instant' | '1_to_2_days';
  icon: IconName;
  iconColor?:
    | string
    | IconColor
    | { [AppThemeKey.light]: string; [AppThemeKey.dark]: string };
}

/**
 * Payment method configuration for debit and credit card payments
 * Provides instant transaction processing for card-based deposits
 */
export const DEBIT_CREDIT_PAYMENT_METHOD: DepositPaymentMethod = {
  id: 'credit_debit_card',
  name: 'Debit or Credit',
  duration: 'instant',
  icon: IconName.Card,
};

/**
 * Payment method configuration for SEPA bank transfers
 * Supports European bank transfers with 1-2 day processing time
 */
export const SEPA_PAYMENT_METHOD: DepositPaymentMethod = {
  id: 'sepa_bank_transfer',
  name: 'SEPA Bank Transfer',
  duration: '1_to_2_days',
  icon: IconName.Bank,
};

/**
 * Payment method configuration for wire transfers
 * Traditional bank wire transfers with 1-2 day processing time
 */
export const WIRE_TRANSFER_PAYMENT_METHOD: DepositPaymentMethod = {
  id: 'wire_transfer',
  name: 'Wire Transfer',
  duration: '1_to_2_days',
  icon: IconName.Bank,
};

/**
 * Payment method configuration for Apple Pay
 * Instant mobile payment processing with theme-aware icon colors
 */
export const APPLE_PAY_PAYMENT_METHOD: DepositPaymentMethod = {
  id: 'apple_pay',
  name: 'Apple Pay',
  duration: 'instant',
  icon: IconName.Apple,
  iconColor: {
    light: brandColor.black,
    dark: brandColor.white,
  },
};

/**
 * Array of all supported payment methods for deposits
 * Ordered by preference with instant methods first
 */
export const SUPPORTED_PAYMENT_METHODS: DepositPaymentMethod[] = [
  APPLE_PAY_PAYMENT_METHOD,
  DEBIT_CREDIT_PAYMENT_METHOD,
  SEPA_PAYMENT_METHOD,
  WIRE_TRANSFER_PAYMENT_METHOD,
];

/**
 * Array of manual bank transfer payment methods
 * Includes methods that require manual bank processing
 */
export const MANUAL_BANK_TRANSFER_PAYMENT_METHODS: DepositPaymentMethod[] = [
  SEPA_PAYMENT_METHOD,
  WIRE_TRANSFER_PAYMENT_METHOD,
];
