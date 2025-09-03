import React, { useEffect } from 'react';
import { BuyQuote } from '@consensys/native-ramps-sdk';

import WebviewModal, { WebviewModalParams } from './WebviewModal';
import useIdProofPolling from '../../../hooks/useIdProofPolling';
import {
  createNavigationDetails,
  useParams,
} from '../../../../../../../util/navigation/navUtils';
import Routes from '../../../../../../../constants/navigation/Routes';
import { useDepositRouting } from '../../../hooks/useDepositRouting';

interface KycWebviewModalParams extends WebviewModalParams {
  quote: BuyQuote;
  kycWorkflowRunId: string;
  cryptoCurrencyChainId: string;
  paymentMethodId: string;
}

/**
 * Creates navigation details for the KYC webview modal
 * @returns {Object} Navigation details object for KYC webview modal routing
 */
export const createKycWebviewModalNavigationDetails =
  createNavigationDetails<KycWebviewModalParams>(
    Routes.DEPOSIT.MODALS.ID,
    Routes.DEPOSIT.MODALS.KYC_WEBVIEW,
  );

/**
 * KYC webview modal component for handling identity verification during deposit flow
 * Polls for ID proof status and routes to next step after successful submission
 * @returns {JSX.Element} The KYC webview modal component
 */
function KycWebviewModal() {
  const { quote, cryptoCurrencyChainId, paymentMethodId, kycWorkflowRunId } =
    useParams<KycWebviewModalParams>();

  const { routeAfterAuthentication } = useDepositRouting({
    cryptoCurrencyChainId,
    paymentMethodId,
  });

  const { idProofStatus } = useIdProofPolling(kycWorkflowRunId, 1000, true, 0);
  useEffect(() => {
    if (idProofStatus === 'SUBMITTED' && quote) {
      routeAfterAuthentication(quote);
    }
  }, [idProofStatus, quote, routeAfterAuthentication]);

  return <WebviewModal />;
}

export default KycWebviewModal;
