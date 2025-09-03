import { Nft } from '@metamask/assets-controllers';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { handleSendPageNavigation } from '../utils/send';
import { AssetType } from '../types/token';

/**
 * Custom hook that provides navigation functionality for sending assets
 * Handles navigation to the send page for both tokens and NFTs in the confirmations flow
 * @returns {Object} Object containing navigateToSendPage function
 */
export const useSendNavigation = () => {
  const { navigate } = useNavigation();

  const navigateToSendPage = useCallback(
    (asset: AssetType | Nft) => {
      handleSendPageNavigation(navigate, asset);
    },
    [navigate],
  );

  return { navigateToSendPage };
};
