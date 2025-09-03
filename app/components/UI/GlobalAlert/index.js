import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { StyleSheet, View, Text } from 'react-native';
import { dismissAlert } from '../../../actions/alert';
import { connect } from 'react-redux';
import { fontStyles } from '../../../styles/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import { ThemeContext, mockTheme } from '../../../util/theme';

/**
 * Creates styles for the GlobalAlert component
 * @param {Object} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      width: '100%',
    },
    copyAlert: (width) => ({
      width: width || 180,
      backgroundColor: colors.overlay.alternative,
      padding: 20,
      paddingTop: 30,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    }),
    copyAlertIcon: {
      marginBottom: 20,
    },
    copyAlertText: {
      textAlign: 'center',
      color: colors.overlay.inverse,
      fontSize: 16,
      ...fontStyles.normal,
    },
  });

/**
 * Wrapper component for a global alert
 * connected to redux
 */
class GlobalAlert extends PureComponent {
  static propTypes = {
    /**
     * Boolean that determines if the modal should be shown
     */
    isVisible: PropTypes.bool.isRequired,
    /**
     * Number that determines when it should be autodismissed (in miliseconds)
     */
    autodismiss: PropTypes.number,
    /**
     * Children component(s)
     */
    content: PropTypes.any,
    /**
     * Object with data required to render the content
     */
    data: PropTypes.object,
    /**
     * function that dismisses de modal
     */
    dismissAlert: PropTypes.func,
  };

  /**
   * Handles closing the alert modal
   */
  onClose = () => {
    this.props.dismissAlert();
  };

  /**
   * Handles component updates and auto-dismissal logic
   * @param {Object} prevProps - Previous component props
   */
  componentDidUpdate(prevProps) {
    if (
      this.props.autodismiss &&
      !isNaN(this.props.autodismiss) &&
      !prevProps.isVisible &&
      this.props.isVisible
    ) {
      setTimeout(() => {
        this.props.dismissAlert();
      }, this.props.autodismiss);
    }
  }

  /**
   * Gets the appropriate component based on content type
   * @param {string} content - The content type identifier
   * @returns {JSX.Element} The component to render
   */
  getComponent(content) {
    switch (content) {
      case 'clipboard-alert':
        return this.renderClipboardAlert();
      default:
        return <View />;
    }
  }

  /**
   * Gets the component styles based on current theme
   * @returns {Object} StyleSheet object with themed styles
   */
  getStyles = () => {
    const colors = this.context.colors || mockTheme.colors;
    return createStyles(colors);
  };

  /**
   * Renders the clipboard alert component with success icon and message
   * @returns {JSX.Element} The clipboard alert component
   */
  renderClipboardAlert = () => {
    const colors = this.context.colors || mockTheme.colors;
    const styles = this.getStyles(colors);

    return (
      <ElevatedView
        style={styles.copyAlert(this.props.data && this.props.data.width)}
        elevation={5}
      >
        <View style={styles.copyAlertIcon}>
          <Icon
            name={'check-circle'}
            size={64}
            color={colors.overlay.inverse}
          />
        </View>
        <Text style={styles.copyAlertText}>
          {this.props.data && this.props.data.msg}
        </Text>
      </ElevatedView>
    );
  };

  render = () => {
    const { content, isVisible } = this.props;
    const colors = this.context.colors || mockTheme.colors;
    const styles = this.getStyles(colors);

    return (
      <Modal
        style={styles.modal}
        isVisible={isVisible}
        onBackdropPress={this.onClose}
        onBackButtonPress={this.onClose}
        backdropOpacity={0}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        useNativeDriver
      >
        {this.getComponent(content)}
      </Modal>
    );
  };
}

/**
 * Maps Redux state to component props
 * @param {Object} state - Redux state object
 * @returns {Object} Props object with alert state properties
 */
const mapStateToProps = (state) => ({
  isVisible: state.alert.isVisible,
  autodismiss: state.alert.autodismiss,
  content: state.alert.content,
  data: state.alert.data,
});

/**
 * Maps Redux dispatch functions to component props
 * @param {Function} dispatch - Redux dispatch function
 * @returns {Object} Props object with action creators
 */
const mapDispatchToProps = (dispatch) => ({
  dismissAlert: () => dispatch(dismissAlert()),
});

GlobalAlert.contextType = ThemeContext;

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAlert);
