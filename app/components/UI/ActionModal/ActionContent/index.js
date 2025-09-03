import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import StyledButton from '../../StyledButton';
import { strings } from '../../../../../locales/i18n';
import { useTheme } from '../../../../util/theme';

/**
 * Creates styles for the ActionContent component
 * @param {Object} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors) =>
  StyleSheet.create({
    viewWrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 24,
    },
    viewContainer: {
      width: '100%',
      backgroundColor: colors.background.default,
      borderRadius: 10,
    },
    actionHorizontalContainer: {
      flexDirection: 'row',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border.muted,
    },
    actionVerticalContainer: {
      flexDirection: 'column',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    childrenContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      margin: 8,
    },
    buttonHorizontal: {
      flex: 1,
    },
  });

/**
 * ActionContent component renders the content of an action modal with customizable buttons
 * Provides a reusable modal content structure with cancel and confirm actions
 * Supports both horizontal and vertical button layouts with extensive styling options
 * @param {Object} props - Component props
 * @param {string} props.cancelTestID - TestID for the cancel button
 * @param {string} props.confirmTestID - TestID for the confirm button
 * @param {string} props.cancelText - Text to show in the cancel button
 * @param {React.ReactNode} props.children - Content to display above the action buttons
 * @param {string} props.confirmText - Text to show in the confirm button
 * @param {boolean} props.confirmDisabled - Whether confirm button is disabled
 * @param {string} props.cancelButtonMode - Type of button to show as the cancel button
 * @param {boolean} props.cancelButtonDisabled - Whether cancel button is disabled
 * @param {string} props.confirmButtonMode - Type of button to show as the confirm button
 * @param {boolean} props.displayCancelButton - Whether cancel button should be displayed
 * @param {boolean} props.displayConfirmButton - Whether confirm button should be displayed
 * @param {Function} props.onCancelPress - Called when the cancel button is clicked
 * @param {Function} props.onConfirmPress - Called when the confirm button is clicked
 * @param {Object} props.viewWrapperStyle - View wrapper style
 * @param {Object} props.viewContainerStyle - View container style
 * @param {Object} props.actionContainerStyle - Action container style
 * @param {Object} props.childrenContainerStyle - Children container style
 * @param {boolean} props.verticalButtons - Whether buttons are rendered vertically
 * @returns {JSX.Element} The rendered ActionContent component
 */
export default function ActionContent({
  cancelTestID,
  confirmTestID,
  cancelText,
  children,
  confirmText,
  confirmDisabled,
  cancelButtonMode,
  cancelButtonDisabled,
  confirmButtonMode,
  displayCancelButton,
  displayConfirmButton,
  onCancelPress,
  onConfirmPress,
  viewWrapperStyle,
  viewContainerStyle,
  actionContainerStyle,
  childrenContainerStyle,
  verticalButtons,
}) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.viewWrapper, viewWrapperStyle]}>
      <View style={[styles.viewContainer, viewContainerStyle]}>
        <View style={[styles.childrenContainer, childrenContainerStyle]}>
          {children}
        </View>
        <View
          style={[
            verticalButtons
              ? styles.actionVerticalContainer
              : styles.actionHorizontalContainer,
            actionContainerStyle,
          ]}
        >
          {displayCancelButton && (
            <StyledButton
              disabled={cancelButtonDisabled}
              testID={cancelTestID}
              type={cancelButtonMode}
              onPress={onCancelPress}
              containerStyle={[
                styles.button,
                !verticalButtons && styles.buttonHorizontal,
              ]}
            >
              {cancelText}
            </StyledButton>
          )}
          {displayConfirmButton && (
            <StyledButton
              testID={confirmTestID}
              type={confirmButtonMode}
              onPress={onConfirmPress}
              containerStyle={[
                styles.button,
                !verticalButtons && styles.buttonHorizontal,
              ]}
              disabled={confirmDisabled}
            >
              {confirmText}
            </StyledButton>
          )}
        </View>
      </View>
    </View>
  );
}

ActionContent.defaultProps = {
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
  viewWrapperStyle: null,
  viewContainerStyle: null,
  childrenContainerStyle: null,
};

ActionContent.propTypes = {
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
};
