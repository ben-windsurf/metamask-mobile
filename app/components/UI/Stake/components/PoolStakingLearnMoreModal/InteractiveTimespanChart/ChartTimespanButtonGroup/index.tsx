import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../../../hooks/useStyles';
import styleSheet from './ChartTimespanButtonGroup.styles';
import { ChartButton } from './ChartTimespanButtonGroup.types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface ChartTimespanButtonProps {
  onPress: () => void;
  label: string;
  isSelected: boolean;
}
/**
 * Individual button component for chart timespan selection
 * @param {ChartTimespanButtonProps} props - Component props
 * @param {Function} props.onPress - Callback function when button is pressed
 * @param {string} props.label - Text label to display on the button
 * @param {boolean} props.isSelected - Whether this button is currently selected
 * @returns {JSX.Element} Rendered timespan button component
 */
const ChartTimespanButton = ({
  onPress,
  label,
  isSelected = false,
}: ChartTimespanButtonProps) => {
  const { styles } = useStyles(styleSheet, { isSelected });

  return (
    <TouchableOpacity style={styles.chartTimespanButton} onPress={onPress}>
      <Text variant={TextVariant.BodyMDMedium} color={TextColor.Alternative}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export interface ChartTimespanButtonGroupProps {
  buttons: ChartButton[];
  onPress: (numDaysToDisplay: number) => void;
  isLoading?: boolean;
}

/**
 * Button group component for selecting chart timespan periods
 * Renders a horizontal group of buttons for different time periods (e.g., 1D, 7D, 30D)
 * Shows skeleton loading state when data is being fetched
 * @param {ChartTimespanButtonGroupProps} props - Component props
 * @param {ChartButton[]} props.buttons - Array of button configurations with labels and values
 * @param {Function} props.onPress - Callback function when a button is pressed, receives the selected timespan value
 * @param {boolean} props.isLoading - Whether to show loading skeleton instead of buttons
 * @returns {JSX.Element} Rendered button group component or loading skeleton
 */
const ChartTimespanButtonGroup = ({
  buttons,
  onPress,
  isLoading = false,
}: ChartTimespanButtonGroupProps) => {
  const { styles } = useStyles(styleSheet, { isSelected: false });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    onPress?.(buttons?.[index]?.value);
  };

  if (isLoading) {
    return (
      <View style={styles.chartTimespanButtonGroup}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            {...styles.chartTimespanButtonGroupSkeleton}
          >
            <SkeletonPlaceholder.Item {...styles.chartTimespanButtonSkeleton} />
            <SkeletonPlaceholder.Item {...styles.chartTimespanButtonSkeleton} />
            <SkeletonPlaceholder.Item {...styles.chartTimespanButtonSkeleton} />
            <SkeletonPlaceholder.Item {...styles.chartTimespanButtonSkeleton} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <View style={styles.chartTimespanButtonGroup}>
      {buttons?.map(({ label }, index) => (
        <ChartTimespanButton
          key={`${label}-${index}`}
          label={label}
          isSelected={index === selectedIndex}
          onPress={() => handlePress(index)}
        />
      ))}
    </View>
  );
};

export default ChartTimespanButtonGroup;
