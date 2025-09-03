import { SignatureRequest } from '@metamask/signature-controller';
import { DataTreeInput } from '../../components/data-tree/data-tree';
import { getTokenContractInDataTree } from '../../components/info/typed-sign-v3v4/message';
import { isRecognizedPermit, isRecognizedOrder } from '../../utils/signature';
import { useGetTokenStandardAndDetails } from '../useGetTokenStandardAndDetails';

/**
 * Custom hook that extracts token decimals from typed signature requests
 * Handles both permit and order signatures by checking verifying contracts and data tree tokens
 * @param {SignatureRequest | undefined} signatureRequest - The signature request to analyze
 * @param {DataTreeInput} data - The data tree input containing signature data
 * @param {string} verifyingContract - The contract address used for verification
 * @returns {number | undefined} The number of token decimals, or undefined if not found
 */
export const useTokenDecimalsInTypedSignRequest = (
  signatureRequest: SignatureRequest | undefined,
  data: DataTreeInput,
  verifyingContract: string,
) => {
  const isPermit = isRecognizedPermit(signatureRequest);
  const isOrder = isRecognizedOrder(signatureRequest);
  const verifyingContractAddress =
    isPermit || isOrder ? verifyingContract : undefined;
  const {
    details: { decimalsNumber: verifyingContractTokenDecimalsNumber } = {},
  } = useGetTokenStandardAndDetails(verifyingContractAddress);

  const tokenContract = getTokenContractInDataTree(
    data as unknown as DataTreeInput,
  );
  const { details: { decimalsNumber } = {} } =
    useGetTokenStandardAndDetails(tokenContract);
  return typeof decimalsNumber === 'number'
    ? decimalsNumber
    : verifyingContractTokenDecimalsNumber;
};
