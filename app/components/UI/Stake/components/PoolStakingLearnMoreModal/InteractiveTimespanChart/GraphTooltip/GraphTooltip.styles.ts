import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for GraphTooltip component
 * Provides styling for tooltip container and skeleton states
 * @returns {Object} StyleSheet object with container and skeleton styles
 */
const styleSheet = () => {
  const baseStyles = StyleSheet.create({
    container: {
      gap: 4,
      alignItems: 'center',
    },
  });

  return StyleSheet.create({
    container: {
      ...baseStyles.container,
      paddingVertical: 16,
    },
    containerSkeleton: baseStyles.container,
  });
};

export default styleSheet;
