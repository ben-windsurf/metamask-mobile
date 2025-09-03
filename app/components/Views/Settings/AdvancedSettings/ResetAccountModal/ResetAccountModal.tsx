import React from 'react';
import { View } from 'react-native';
import Text, {
  TextVariant,
} from '../../../../../component-library/components/Texts/Text';
import { strings } from '../../../../../../locales/i18n';
import ActionModal from '../../../../UI/ActionModal';
import { wipeTransactions } from '../../../../../util/transaction-controller';
import { wipeBridgeStatus } from '../../../../UI/Bridge/utils';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectSelectedInternalAccountFormattedAddress } from '../../../../../selectors/accountsController';
import { selectChainId } from '../../../../../selectors/networkController';

/**
 * ResetAccountModal component displays a confirmation modal for resetting account transaction history
 * Allows users to clear all transaction data and bridge status for the current account
 * Navigates back to WalletView after successful reset operation
 * @param {Object} props - Component props
 * @param {boolean} props.resetModalVisible - Controls modal visibility
 * @param {() => void} props.cancelResetAccount - Callback function to cancel the reset operation
 * @param {any} props.styles - Style object for modal components
 * @returns {JSX.Element} The rendered reset account confirmation modal
 */
export const ResetAccountModal = ({
  resetModalVisible,
  cancelResetAccount,
  styles,
}: {
  resetModalVisible: boolean;
  cancelResetAccount: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles: any;
}) => {
  const navigation = useNavigation();
  const selectedAddress = useSelector(
    selectSelectedInternalAccountFormattedAddress,
  );
  const chainId = useSelector(selectChainId);

  const resetAccount = () => {
    if (selectedAddress) {
      wipeBridgeStatus(selectedAddress, chainId);
    }
    wipeTransactions();
    navigation.navigate('WalletView');
  };

  return (
    <ActionModal
      modalVisible={resetModalVisible}
      confirmText={strings('app_settings.reset_account_confirm_button')}
      cancelText={strings('app_settings.reset_account_cancel_button')}
      onCancelPress={cancelResetAccount}
      onRequestClose={cancelResetAccount}
      onConfirmPress={resetAccount}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle} variant={TextVariant.HeadingMD}>
          {strings('app_settings.reset_account_modal_title')}
        </Text>
        <Text style={styles.modalText}>
          {strings('app_settings.reset_account_modal_message')}
        </Text>
      </View>
    </ActionModal>
  );
};
