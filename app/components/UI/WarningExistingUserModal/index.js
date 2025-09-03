import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { strings } from '../../../../locales/i18n';
import { fontStyles } from '../../../styles/common';
import ActionModal from '../ActionModal';
import { useTheme } from '../../../util/theme';

const createStyles = (colors) =>
  StyleSheet.create({
    warningModalView: {
      margin: 24,
    },
    warningModalTitle: {
      ...fontStyles.bold,
      color: colors.error.default,
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 16,
    },
    warningModalText: {
      ...fontStyles.normal,
      color: colors.text.default,
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 18,
    },
    warningModalTextBold: {
      ...fontStyles.bold,
      color: colors.text.default,
    },
  });

const Default = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.warningModalView}>
      <Text style={styles.warningModalTitle}>
        {strings('onboarding.warning_title')}
      </Text>
      <Text style={styles.warningModalText}>
        {strings('onboarding.warning_text_1')}
        <Text style={styles.warningModalTextBold}>{` ${strings(
          'onboarding.warning_text_2',
        )} `}</Text>
        {strings('onboarding.warning_text_3')}
      </Text>
      <Text />
      <Text style={styles.warningModalText}>
        {strings('onboarding.warning_text_4')}
      </Text>
    </View>
  );
};

/**
 * Modal component that displays a warning message for existing users during onboarding
 * Shows a customizable warning dialog with cancel and confirm actions
 * @param {Object} props - Component props
 * @param {boolean} props.warningModalVisible - Whether the modal is visible
 * @param {Function} props.onCancelPress - Callback when cancel button is pressed
 * @param {boolean} props.cancelButtonDisabled - Whether cancel button is disabled
 * @param {Function} props.onRequestClose - Callback when modal is requested to close
 * @param {Function} props.onConfirmPress - Callback when confirm button is pressed
 * @param {React.ReactNode} props.children - Custom content to display in modal
 * @param {string} props.cancelText - Custom text for cancel button
 * @param {string} props.confirmText - Custom text for confirm button
 * @param {string} props.confirmTestID - Test ID for confirm button
 * @param {string} props.cancelTestID - Test ID for cancel button
 * @returns {JSX.Element} The rendered warning modal component
 */
export default function WarningExistingUserModal({
  warningModalVisible,
  onCancelPress,
  cancelButtonDisabled,
  onRequestClose,
  onConfirmPress,
  children,
  cancelText,
  confirmText,
  confirmTestID,
  cancelTestID,
}) {
  return (
    <ActionModal
      modalVisible={warningModalVisible}
      cancelTestID={cancelTestID}
      confirmTestID={confirmTestID}
      cancelText={cancelText || strings('onboarding.warning_proceed')}
      confirmText={confirmText || strings('onboarding.warning_cancel')}
      onCancelPress={onCancelPress}
      cancelButtonDisabled={cancelButtonDisabled}
      onRequestClose={onRequestClose}
      onConfirmPress={onConfirmPress}
      cancelButtonMode={'warning'}
      confirmButtonMode={'neutral'}
      verticalButtons
    >
      {(children && children) || <Default />}
    </ActionModal>
  );
}

WarningExistingUserModal.propTypes = {
  cancelText: PropTypes.string,
  cancelButtonDisabled: PropTypes.bool,
  confirmText: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  cancelTestID: PropTypes.string,
  confirmTestID: PropTypes.string,

  /**
   * Whether the modal is visible
   */
  warningModalVisible: PropTypes.bool.isRequired,
  /**
   * Cancel callback
   */
  onCancelPress: PropTypes.func.isRequired,
  /**
   * Close callback
   */
  onRequestClose: PropTypes.func.isRequired,
  /**
   * Confirm callback
   */
  onConfirmPress: PropTypes.func.isRequired,
};
