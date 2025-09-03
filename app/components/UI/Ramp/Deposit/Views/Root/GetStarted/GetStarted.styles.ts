import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '../../../../../../../util/theme/models';

const screenWidth = Dimensions.get('window').width;

/**
 * Creates stylesheet for the GetStarted component with theme-aware styling
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing color and styling definitions
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;

  return StyleSheet.create({
    title: {
      marginBottom: 16,
      fontWeight: 'bold',
    },
    getStartedImageWrapper: {
      alignItems: 'center',
    },
    getStartedImage: {
      width: screenWidth * 0.65,
      height: screenWidth * 0.49,
      alignSelf: 'center',
      marginVertical: 16,
    },
    bulletPointContainer: {
      marginVertical: 8,
      flexDirection: 'row',
    },
    bulletPointContent: {
      flex: 1,
      marginLeft: 12,
    },
    bulletPointDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.text.alternative,
    },
  });
};

export default styleSheet;
