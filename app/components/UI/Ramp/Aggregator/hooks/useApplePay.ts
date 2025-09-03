import { useCallback } from 'react';
// @ts-expect-error ts(7016) react-native-payments is not typed
import { PaymentRequest } from '@metamask/react-native-payments';

import { strings } from '../../../../../../locales/i18n';
import Logger from '../../../../../util/Logger';
import { CryptoCurrency, QuoteResponse } from '@consensys/on-ramp-sdk';
import {
  ApplePayPurchaseStatus,
  IApplePaySetup,
} from '@consensys/on-ramp-sdk/dist/ApplePay';

//* Payment Request */

/**
 * Constant indicating that an Apple Pay payment request was aborted by the user
 */
export const ABORTED = 'ABORTED';
enum PAYMENT_REQUEST_COMPLETE {
  SUCCESS = 'success',
  UNKNOWN = 'unknown',
  FAIL = 'fail',
}

//* Setup */
/**
 * Creates Apple Pay setup configuration for a given quote
 * @param {QuoteResponse} quote - The quote response containing payment details
 * @returns {IApplePaySetup} Apple Pay setup configuration with label functions
 */
function createApplePaySetup(quote: QuoteResponse): IApplePaySetup {
  return {
    getPurchaseFiatAmountWithoutFeeLabel(crypto: CryptoCurrency) {
      return strings('fiat_on_ramp.apple_pay_purchase', {
        currency: crypto.symbol,
      });
    },

    getPurchaseFiatFeeLabel() {
      return strings('fiat_on_ramp.Fee');
    },

    getPurchaseFiatTotalAmountLabel() {
      return strings('fiat_on_ramp.apple_pay_provider_total_label', {
        provider: quote.provider.name,
      });
    },
  };
}

/**
 * Custom hook for handling Apple Pay payments in the fiat on-ramp flow
 * Provides functionality to show Apple Pay payment request and process the payment
 * @param {QuoteResponse} quote - The quote response containing Apple Pay payment details
 * @returns {[Function]} Array containing the showRequest function
 */
function useApplePay(quote: QuoteResponse) {
  const showRequest = useCallback(async () => {
    if (!quote.getApplePayRequestInfo || !quote.purchaseWithApplePay) {
      throw new Error('Quote does not support Apple Pay');
    }

    const applePaySetup = createApplePaySetup(quote);
    const applePayInfo = quote.getApplePayRequestInfo(applePaySetup);
    const paymentRequest = new PaymentRequest(
      applePayInfo.methodData,
      applePayInfo.paymentDetails,
      applePayInfo.paymentOptions,
    );
    try {
      const paymentResponse = await paymentRequest.show();
      if (!paymentResponse) {
        throw new Error('Payment Request Failed: empty apple pay response');
      }

      const purchaseResult = await quote.purchaseWithApplePay(
        paymentResponse.details,
      );

      switch (purchaseResult.status) {
        case ApplePayPurchaseStatus.FAILURE: {
          paymentResponse.complete(PAYMENT_REQUEST_COMPLETE.FAIL);
          if (purchaseResult.error?.message) {
            throw purchaseResult.error;
          } else {
            throw new Error(purchaseResult.error);
          }
        }
        case ApplePayPurchaseStatus.SUCCESS:
        case ApplePayPurchaseStatus.PENDING: {
          paymentResponse.complete(PAYMENT_REQUEST_COMPLETE.SUCCESS);
          return {
            order: purchaseResult.order,
            authenticationUrl: purchaseResult.authenticationUrl,
          };
        }
      }
    } catch (error) {
      if ((error as Error).message.includes('AbortError')) {
        return ABORTED;
      }
      if (paymentRequest?.abort) {
        paymentRequest.abort();
      }
      Logger.error(error as Error, {
        message: 'FiatOnRampAgg::ApplePay error while creating order',
      });
      throw error;
    }
  }, [quote]);

  return [showRequest] as const;
}

/**
 * Default export of the useApplePay hook
 */
export default useApplePay;
