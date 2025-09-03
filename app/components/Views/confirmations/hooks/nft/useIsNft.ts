import { NetworkClientId } from '@metamask/network-controller';

import { TokenStandard } from '../../../../UI/SimulationDetails/types';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';
import { useGetTokenStandardAndDetails } from '../useGetTokenStandardAndDetails';

/**
 * Custom hook that determines if a transaction involves an NFT token
 * Analyzes the transaction metadata to check if the target token follows ERC-721 or ERC-1155 standards
 * @returns {Object} Object containing isNft boolean and isPending loading state
 * @returns {boolean|undefined} returns.isNft - True if token is NFT, false if not, undefined if loading
 * @returns {boolean} returns.isPending - True while token standard is being determined
 */
export const useIsNft = (): { isNft?: boolean; isPending: boolean } => {
  const transactionMetadata = useTransactionMetadataRequest();
  const tokenAddress = transactionMetadata?.txParams?.to as string;
  const networkClientId =
    transactionMetadata?.networkClientId as NetworkClientId;
  const { details, isPending } = useGetTokenStandardAndDetails(
    tokenAddress,
    networkClientId,
  );

  // Native token / loading state
  if (isPending || details?.standard === undefined) {
    return { isNft: undefined, isPending };
  }

  // NFT check
  const isNft =
    details.standard === TokenStandard.ERC1155 ||
    details.standard === TokenStandard.ERC721;

  return { isNft, isPending };
};
