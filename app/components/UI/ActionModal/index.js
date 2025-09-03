import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { strings } from '../../../../locales/i18n';
import ActionContent from './ActionContent';
import { useTheme } from '../../../util/theme';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    width: '100%',
  },
});

/**
 * ActionModal component renders a customizable modal with action buttons
 * Provides cancel and confirm buttons with configurable text, styling, and behavior
 * @param {Object} props - Component props
 * @param {string} props.cancelTestID - TestID for the cancel button
 * @param {string} props.confirmTestID - TestID for the confirm button
 * @param {string} props.cancelText - Text to show in the cancel button
 * @param {React.ReactNode} props.children - Content to display above the action buttons
 * @param {string} props.confirmText - Text to show in the confirm button
 * @param {boolean} props.confirmDisabled - Whether confirm button is disabled
 * @param {string} props.cancelButtonMode - Type of button to show as the cancel button
 * @param {string} props.confirmButtonMode - Type of button to show as the confirm button
 * @param {boolean} props.displayCancelButton - Whether cancel button should be displayed
 * @param {boolean} props.displayConfirmButton - Whether confirm button should be displayed
 * @param {Function} props.onCancelPress - Called when the cancel button is clicked
 * @param {Function} props.onConfirmPress - Called when the confirm button is clicked
 * @param {Function} props.onRequestClose - Called when hardware back button on Android is clicked
 * @param {boolean} props.modalVisible - Whether modal is shown
 * @param {Object} props.modalStyle - Modal style
 * @param {Object} props.viewWrapperStyle - View wrapper style
 * @param {Object} props.viewContainerStyle - View container style
 * @param {Object} props.actionContainerStyle - Action container style
 * @param {Object} props.childrenContainerStyle - Children container style
 * @param {boolean} props.verticalButtons - Whether buttons are rendered vertically
 * @param {boolean} props.propagateSwipe - Allows swipe events to propagate to children components
 * @param {boolean} props.cancelButtonDisabled - Whether cancel button is disabled
 * @returns {JSX.Element} The rendered action modal component
 */
export default function ActionModal({
  cancelTestID,
  confirmTestID,
  cancelText,
  children,
  confirmText,
  confirmDisabled,
  cancelButtonMode,
  confirmButtonMode,
  displayCancelButton,
  displayConfirmButton,
  onCancelPress,
  onConfirmPress,
  onRequestClose,
  modalVisible,
  modalStyle,
  viewWrapperStyle,
  viewContainerStyle,
  actionContainerStyle,
  childrenContainerStyle,
  verticalButtons,
  propagateSwipe,
  cancelButtonDisabled,
}) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={modalVisible}
      style={[styles.modal, modalStyle]}
      onBackdropPress={onRequestClose}
      onBackButtonPress={onRequestClose}
      onSwipeComplete={onRequestClose}
      swipeDirection={'down'}
      propagateSwipe={propagateSwipe}
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
      avoidKeyboard
    >
      <ActionContent
        cancelTestID={cancelTestID}
        confirmTestID={confirmTestID}
        cancelText={cancelText}
        confirmText={confirmText}
        confirmDisabled={confirmDisabled}
        cancelButtonMode={cancelButtonMode}
        cancelButtonDisabled={cancelButtonDisabled}
        confirmButtonMode={confirmButtonMode}
        displayCancelButton={displayCancelButton}
        displayConfirmButton={displayConfirmButton}
        onCancelPress={onCancelPress}
        onConfirmPress={onConfirmPress}
        viewWrapperStyle={viewWrapperStyle}
        viewContainerStyle={viewContainerStyle}
        actionContainerStyle={actionContainerStyle}
        childrenContainerStyle={childrenContainerStyle}
        verticalButtons={verticalButtons}
      >
        {children}
      </ActionContent>
    </Modal>
  );
}

ActionModal.defaultProps = {
  cancelButtonMode: 'neutral',
  cancelButtonDisabled: false,
  confirmButtonMode: 'warning',
  confirmTestID: '',
  cancelTestID: '',
  cancelText: strings('action_view.cancel'),
  confirmText: strings('action_view.confirm'),
  confirmDisabled: false,
  displayCancelButton: true,
  displayConfirmButton: true,
};

ActionModal.propTypes = {
  cancelButtonDisabled: PropTypes.bool,
  /**
   * TestID for the cancel button
   */
  cancelTestID: PropTypes.string,
  /**
   * TestID for the confirm button
   */
  confirmTestID: PropTypes.string,
  /**
   * Text to show in the cancel button
   */
  cancelText: PropTypes.string,
  /**
   * Content to display above the action buttons
   */
  children: PropTypes.node,
  /**
   * Type of button to show as the cancel button
   */
  cancelButtonMode: PropTypes.string,
  /**
   * Type of button to show as the confirm button
   */
  confirmButtonMode: PropTypes.string,
  /**
   * Whether confirm button is disabled
   */
  confirmDisabled: PropTypes.bool,
  /**
   * Text to show in the confirm button
   */
  confirmText: PropTypes.string,
  /**
   * Whether cancel button should be displayed
   */
  displayCancelButton: PropTypes.bool,
  /**
   * Whether confirm button should be displayed
   */
  displayConfirmButton: PropTypes.bool,
  /**
   * Called when the cancel button is clicked
   */
  onCancelPress: PropTypes.func,
  /**
   * Called when the confirm button is clicked
   */
  onConfirmPress: PropTypes.func,
  /**
   * Called when hardware back button on Android is clicked
   */
  onRequestClose: PropTypes.func,
  /**
   * Whether modal is shown
   */
  modalVisible: PropTypes.bool,
  /**
   * Modal style
   */
  modalStyle: PropTypes.object,
  /**
   * View wrapper style
   */
  viewWrapperStyle: PropTypes.object,
  /**
   * View container style
   */
  viewContainerStyle: PropTypes.object,
  /**
   * Action container style
   */
  actionContainerStyle: PropTypes.object,
  /**
   * Whether buttons are rendered vertically
   */
  verticalButtons: PropTypes.bool,
  /**
   * Children container style
   */
  childrenContainerStyle: PropTypes.object,
  /**
   * Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
   */
  propagateSwipe: PropTypes.bool,
};
