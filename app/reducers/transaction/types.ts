import { SelectedAsset } from '../../components/UI/AccountFromToInfoCard/AccountFromToInfoCard.types';
import { SecurityAlertResponse } from '@metamask/transaction-controller';
import { AssetType, TransactionObject } from '../../actions/transaction/types';

/**
 * Transaction reducer state
 */
export interface TransactionState {
  selectedAsset: SelectedAsset;
  assetType?: AssetType;
  transaction: TransactionObject;
  nonce?: string;
  proposedNonce?: string;
  securityAlertResponses: Record<string, SecurityAlertResponse>;
  ensRecipient?: string;
  transactionTo?: string;
  transactionToName?: string;
  transactionFromName?: string;
  transactionValue?: string;
  symbol?: string;
  paymentRequest?: unknown;
  readableValue?: string;
  id?: string;
  type?: string;
  warningGasPriceHigh?: boolean;
  useMax: boolean;
  maxValueMode?: boolean;
}
