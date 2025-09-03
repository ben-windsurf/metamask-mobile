import { ApprovalType } from '@metamask/controller-utils';
import { SignatureRequest } from '@metamask/signature-controller';
import { useSelector } from 'react-redux';

import { selectSignatureRequestById } from '../../../../../selectors/signatureController';
import { RootState } from '../../../../UI/BasicFunctionality/BasicFunctionalityModal/BasicFunctionalityModal.test';
import useApprovalRequest from '../useApprovalRequest';

const SIGNATURE_APPROVAL_TYPES = [
  ApprovalType.PersonalSign,
  ApprovalType.EthSignTypedData,
];

/**
 * Custom hook that retrieves signature request data for confirmation flows
 * Filters approval requests to only return signature-related requests (PersonalSign, EthSignTypedData)
 * Used in confirmation views to access signature request details for user approval
 * @returns {SignatureRequest | undefined} The signature request object or undefined if not a signature request
 */
export function useSignatureRequest() {
  const { approvalRequest } = useApprovalRequest();

  const signatureRequest = useSelector((state: RootState) =>
    selectSignatureRequestById(state, approvalRequest?.id as string),
  );

  if (
    !SIGNATURE_APPROVAL_TYPES.includes(approvalRequest?.type as ApprovalType) ||
    !signatureRequest
  ) {
    return undefined;
  }

  return signatureRequest as SignatureRequest;
}
