import React from 'react';
import { View, TouchableOpacity, Text as RNText } from 'react-native';

import { useStyles } from '../../../../../../component-library/hooks';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';
import { type GasOption as GasOptionType } from '../../../types/gas';
import styleSheet from './gas-option.styles';

/**
 * GasOption component displays a selectable gas fee option with pricing and timing information
 * Renders gas option details including name, estimated time, fiat value, and selection state
 * Used in gas fee selection interfaces to allow users to choose transaction speed and cost
 * @param {Object} props - Component props
 * @param {GasOptionType} props.option - Gas option data containing pricing, timing, and selection info
 * @returns {JSX.Element} The rendered gas option component
 */
export const GasOption = ({ option }: { option: GasOptionType }) => {
  const {
    onSelect,
    name,
    estimatedTime,
    valueInFiat,
    value,
    emoji,
    isSelected,
    key,
  } = option;

  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.optionWrapper}>
      {isSelected && (
        <View style={styles.selectionIndicator} testID="selection-indicator" />
      )}
      <TouchableOpacity
        testID={`gas-option-${key}`}
        style={[styles.optionContainer, isSelected && styles.selectedOption]}
        onPress={() => onSelect()}
      >
        <View style={styles.leftSection}>
          <RNText style={styles.emoji}>{emoji}</RNText>
          <View style={styles.optionTextContainer}>
            <Text variant={TextVariant.BodyMDMedium} style={styles.optionName}>
              {name}
            </Text>
            {estimatedTime && (
              <Text
                variant={TextVariant.BodySMMedium}
                style={styles.estimatedTime}
              >
                {estimatedTime}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text variant={TextVariant.BodyMDMedium} style={styles.valueInFiat}>
            {valueInFiat}
          </Text>
          {!!value && (
            <Text variant={TextVariant.BodySMMedium} style={styles.value}>
              {value}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
