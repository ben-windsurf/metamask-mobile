import React from 'react';
import { View } from 'react-native';

import { useStyles } from '../../../../../../component-library/hooks';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';
import styleSheet from './pill.styles';

/**
 * Pill component displays text content in a styled pill-shaped container
 * Used in confirmation flows to display labels, tags, or status indicators
 * @param {Object} props - Component props
 * @param {string} props.text - The text content to display inside the pill
 * @param {string} [props.testID] - Optional test identifier for testing purposes
 * @returns {JSX.Element} The rendered pill component
 */
export const Pill = ({ text, testID }: { text: string; testID?: string }) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.container}>
      <Text variant={TextVariant.BodyMD} testID={testID}>
        {text}
      </Text>
    </View>
  );
};
