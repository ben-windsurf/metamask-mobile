import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet } from 'react-native';
import Device from '../../../util/device';
import { ThemeContext, mockTheme } from '../../../util/theme';

/**
 * Creates styles for the FadeOutOverlay component
 * @param {Object} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors) =>
  StyleSheet.create({
    view: {
      backgroundColor: colors.background.default,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

/**
 * FadeOutOverlay component that creates a full-screen overlay that fades out over time
 * Used to provide smooth transitions and visual effects during app initialization
 * Automatically removes itself from the render tree after the fade animation completes
 */
export default class FadeOutOverlay extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    duration: PropTypes.number,
  };

  state = {
    done: false,
  };

  opacity = new Animated.Value(1);

  componentDidMount() {
    Animated.timing(this.opacity, {
      toValue: 0,
      duration: this.props.duration,
      useNativeDriver: true,
      isInteraction: false,
    }).start(() => {
      this.setState({ done: true });
    });
  }

  render() {
    const colors = this.context.colors || mockTheme.colors;
    const styles = createStyles(colors);

    if (this.state.done) return null;
    return (
      <Animated.View
        style={[{ opacity: this.opacity }, styles.view, this.props.style]}
      />
    );
  }
}

FadeOutOverlay.contextType = ThemeContext;

FadeOutOverlay.defaultProps = {
  style: null,
  duration: Device.isAndroid() ? 300 : 300,
};
