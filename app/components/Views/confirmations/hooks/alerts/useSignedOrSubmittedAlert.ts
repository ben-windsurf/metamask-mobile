import { useMemo } from 'react';
import { TransactionStatus } from '@metamask/transaction-controller';
import { AlertKeys } from '../../constants/alerts';
import { Severity } from '../../types/alerts';
import { strings } from '../../../../../../locales/i18n';

import { useSelector } from 'react-redux';
import { selectTransactions } from '../../../../../selectors/transactionController';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';

const blockableStatuses = [
  TransactionStatus.signed,
  TransactionStatus.approved,
];

/**
 * Custom hook that provides alerts for signed or submitted transactions
 * Monitors transaction states and returns blocking alerts when there are pending transactions
 * that could interfere with the current confirmation flow
 * @returns {Array} Array of alert objects with blocking status, key, message, and severity
 */
export const useSignedOrSubmittedAlert = () => {
  const transactions = useSelector(selectTransactions);
  const transactionMetadata = useTransactionMetadataRequest();

  return useMemo(() => {
    const showAlert = transactions
      .filter((transaction) => transaction.id !== transactionMetadata?.id)
      .some((transaction) => blockableStatuses.includes(transaction.status));

    if (!showAlert) {
      return [];
    }

    return [
      {
        isBlocking: true,
        key: AlertKeys.SignedOrSubmitted,
        message: strings('alert_system.signed_or_submitted.message'),
        severity: Severity.Danger,
      },
    ];
  }, [transactions, transactionMetadata]);
};
