import React from 'react';
import { View } from 'react-native';

import { useStyles } from '../../../../../../component-library/hooks';
import { strings } from '../../../../../../../locales/i18n';
import BottomModal from '../../UI/bottom-modal';
import { GasOption } from '../../../components/gas/gas-option';
import { useGasOptions } from '../../../hooks/gas/useGasOptions';
import { GasModalHeader } from '../../../components/gas/gas-modal-header';
import { GasModalType } from '../../../constants/gas';
import styleSheet from './estimates-modal.styles';

/**
 * EstimatesModal component displays gas fee estimation options in a bottom modal
 * Allows users to select different gas fee options (slow, standard, fast) for transactions
 * Provides an interface for editing network fees with various gas price estimates
 * @param {Object} props - Component props
 * @param {function} props.setActiveModal - Function to set the active modal type
 * @param {function} props.handleCloseModals - Function to close all modals
 * @returns {JSX.Element} The rendered estimates modal component
 */
export const EstimatesModal = ({
  setActiveModal,
  handleCloseModals,
}: {
  setActiveModal: (modal: GasModalType) => void;
  handleCloseModals: () => void;
}) => {
  const { styles } = useStyles(styleSheet, {});
  const { options } = useGasOptions({ setActiveModal, handleCloseModals });

  return (
    <BottomModal
      onBackdropPress={handleCloseModals}
      onBackButtonPress={handleCloseModals}
      onSwipeComplete={handleCloseModals}
    >
      <View style={styles.container}>
        <GasModalHeader
          onBackButtonClick={handleCloseModals}
          title={strings('transactions.gas_modal.edit_network_fee')}
        />
        {options.map((option) => (
          <GasOption key={option.key} option={option} />
        ))}
      </View>
    </BottomModal>
  );
};
