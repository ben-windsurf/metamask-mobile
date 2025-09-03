import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import GenericButton from '../GenericButton'; // eslint-disable-line import/no-unresolved
import { useTheme } from '../../../util/theme';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

/**
 * Creates styles for the Button component based on theme colors
 * @param {Object} colors - Theme colors object
 * @returns {Object} StyleSheet object with button styles
 */
const createStyles = (colors) =>
  StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.default,
      paddingVertical: 10,
      paddingHorizontal: 15,
      height: 40,
      borderRadius: 4,
    },
  });

/**
 * @deprecated This `<Button>` component has been deprecated in favor of the new `<Button>` component from the component-library.
 * Please update your code to use the new `<Button>` component instead, which can be found at app/component-library/components/Buttons/Button/Button.tsx.
 * You can find documentation for the new Button component in the README:
 * {@link https://github.com/MetaMask/metamask-mobile/tree/main/app/component-library/components/Buttons/Button/README.md}
 * If you would like to help with the replacement of the old `Button` component, please submit a pull request against this GitHub issue:
 * {@link https://github.com/MetaMask/metamask-mobile/issues/8108}
 *
 * Legacy Button component that renders a styled pressable button
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content (text, icons, or other components)
 * @param {Object} props.style - Additional styles to apply to the button
 * @param {Function} props.onPress - Function called when button is pressed
 * @returns {JSX.Element} Rendered button component
 */
const Button = (props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <GenericButton onPress={props.onPress} style={[styles.button, props.style]}>
      {props.children}
    </GenericButton>
  );
};

Button.propTypes = {
  /**
   * Children components of the Button
   * it can be a text node, an image, or an icon
   * or an Array with a combination of them
   */
  children: PropTypes.any,
  /**
   * Styles to be applied to the Button
   */
  style: ViewPropTypes.style,
  /**
   * Function to be called on press
   */
  onPress: PropTypes.func,
};

export default Button;
