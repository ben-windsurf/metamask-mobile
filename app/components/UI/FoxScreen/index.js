import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ThemeContext, mockTheme } from '../../../util/theme';
import { CommonSelectorsIDs } from '../../../../e2e/selectors/Common.selectors';

/**
 * Creates styles for the FoxScreen component
 * @param {Object} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.background.default,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    image: {
      width: 100,
      height: 100,
    },
  });

const foxImage = require('../../../images/branding/fox.png'); // eslint-disable-line import/no-commonjs

/**
 * FoxScreen component displays the MetaMask fox logo centered on screen
 * Used as a loading screen or placeholder while the app initializes
 * @returns {JSX.Element} A centered fox image with themed background
 */
export default class FoxScreen extends PureComponent {
  render = () => {
    const colors = this.context.colors || mockTheme.colors;
    const styles = createStyles(colors);

    return (
      <View style={styles.wrapper} testID={CommonSelectorsIDs.FOX_SCREEN}>
        <Image source={foxImage} style={styles.image} resizeMethod={'auto'} />
      </View>
    );
  };
}

FoxScreen.contextType = ThemeContext;
