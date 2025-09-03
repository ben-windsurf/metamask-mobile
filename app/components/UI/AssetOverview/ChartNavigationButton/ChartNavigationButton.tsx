import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useStyles } from '../../../../component-library/hooks';
import Text, {
  TextColor,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import styleSheet from './ChartNavigationButton.styles';

interface ChartNavigationButtonProps {
  onPress: () => void;
  label: string;
  selected: boolean;
}

/**
 * ChartNavigationButton renders a navigation button for chart time period selection
 * Displays different styles based on selection state and handles press events
 * @param {ChartNavigationButtonProps} props - Component props
 * @param {() => void} props.onPress - Callback function when button is pressed
 * @param {string} props.label - Text label to display on the button
 * @param {boolean} props.selected - Whether this button is currently selected
 * @returns {JSX.Element} A touchable button with styled text
 */
const ChartNavigationButton = ({
  onPress,
  label,
  selected,
}: ChartNavigationButtonProps) => {
  const { styles } = useStyles(styleSheet, { selected });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text
        variant={TextVariant.BodySM}
        style={styles.label}
        color={selected ? TextColor.Default : TextColor.Alternative}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default ChartNavigationButton;
