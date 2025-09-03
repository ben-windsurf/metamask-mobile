import React, { useCallback } from 'react';
import { BridgeSourceNetworkSelector } from '../../../../../UI/Bridge/components/BridgeSourceNetworkSelector';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSelectedSourceChainIds } from '../../../../../../core/redux/slices/bridge';
import { Hex } from '@metamask/utils';

/**
 * PayWithNetworkModal component provides a modal interface for selecting bridge source networks
 * Allows users to choose which networks they want to use for cross-chain bridge transactions
 * Updates the Redux store with selected chain IDs and navigates back when selection is applied
 * @returns {JSX.Element} The rendered bridge source network selector modal
 */
export function PayWithNetworkModal() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleApply = useCallback(
    (selectedChainIds: Hex[]) => {
      dispatch(setSelectedSourceChainIds(selectedChainIds));
      navigation.goBack();
    },
    [dispatch, navigation],
  );

  return <BridgeSourceNetworkSelector onApply={handleApply} />;
}
