import React, { useCallback, useState } from 'react';

import { EstimatesModal } from '../estimates-modal';
import { AdvancedEIP1559Modal } from '../advanced-eip1559-modal';
import { AdvancedGasPriceModal } from '../advanced-gas-price-modal';
import { GasModalType } from '../../../constants/gas';

/**
 * GasFeeModal component manages the display of different gas fee configuration modals
 * Provides a unified interface for switching between estimates, advanced EIP-1559, and legacy gas price modals
 * Used in transaction confirmation flows to allow users to customize gas settings
 * @param {Object} props - Component props
 * @param {function} props.setGasModalVisible - Function to control the visibility of the gas modal
 * @returns {JSX.Element|null} The appropriate gas modal component based on active modal type
 */
export const GasFeeModal = ({
  setGasModalVisible,
}: {
  setGasModalVisible: (visible: boolean) => void;
}) => {
  const [activeModal, setActiveModal] = useState(GasModalType.ESTIMATES);

  const handleCloseModals = useCallback(() => {
    setGasModalVisible(false);
  }, [setGasModalVisible]);

  switch (activeModal) {
    case GasModalType.ESTIMATES:
      return (
        <EstimatesModal
          setActiveModal={setActiveModal}
          handleCloseModals={handleCloseModals}
        />
      );
    case GasModalType.ADVANCED_EIP1559:
      return (
        <AdvancedEIP1559Modal
          setActiveModal={setActiveModal}
          handleCloseModals={handleCloseModals}
        />
      );
    case GasModalType.ADVANCED_GAS_PRICE:
      return (
        <AdvancedGasPriceModal
          setActiveModal={setActiveModal}
          handleCloseModals={handleCloseModals}
        />
      );
    default:
      return null;
  }
};
