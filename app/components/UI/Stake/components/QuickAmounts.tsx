import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ButtonSize,
  ButtonWidthTypes,
} from '../../../../component-library/components/Buttons/Button';
import ButtonBase from '../../../../component-library/components/Buttons/Button/foundation/ButtonBase';
import {
  TextColor,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import { useTheme } from '../../../../util/theme';
import { Colors } from '../../../../util/theme/models';
import type { QuickAmount } from '../../Ramp/Aggregator/types';
import { IconName } from '../../../../component-library/components/Icons/Icon';
import { useSelector } from 'react-redux';
import { selectStablecoinLendingEnabledFlag } from '../../Earn/selectors/featureFlags';

/**
 * Creates styles for the QuickAmounts component
 * @param {Colors} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.background.default,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      padding: 16,
    },
    amount: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border.default,
      backgroundColor: colors.background.default,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 16,
      alignItems: 'center',
      borderRadius: 20,
    },
  });

interface AmountProps {
  amount: QuickAmount;
  onPress: (amount: QuickAmount) => void;
  onMaxPress?: () => void;
  disabled?: boolean;
}

/**
 * Individual amount button component for quick selection
 * Renders a button with the amount label and handles press events
 * @param {AmountProps} props - Component props
 * @param {QuickAmount} props.amount - The amount object containing value and label
 * @param {Function} props.onPress - Callback when amount is pressed
 * @param {Function} props.onMaxPress - Optional callback for max amount selection
 * @returns {JSX.Element} Rendered amount button component
 */
const Amount = ({ amount, onPress, onMaxPress }: AmountProps) => {
  const { value, label } = amount;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const isStablecoinLendingEnabled = useSelector(
    selectStablecoinLendingEnabledFlag,
  );

  const handlePress = useCallback(() => {
    if (value === 1 && onMaxPress) {
      onMaxPress();
      return;
    }
    onPress(amount);
  }, [value, onMaxPress, amount, onPress]);

  return (
    <>
      <ButtonBase
        onPress={handlePress}
        size={ButtonSize.Md}
        width={ButtonWidthTypes.Full}
        label={label}
        labelColor={TextColor.Default}
        labelTextVariant={TextVariant.BodyMDMedium}
        {...(value === 1 && !isStablecoinLendingEnabled
          ? { startIconName: IconName.Sparkle }
          : {})}
        style={styles.amount}
      />
    </>
  );
};

interface QuickAmountsProps {
  amounts: QuickAmount[];
  onAmountPress: (amount: QuickAmount) => void;
  onMaxPress?: () => void;
}

/**
 * QuickAmounts component displays a row of quick amount selection buttons
 * Used for staking operations to allow users to quickly select preset amounts
 * @param {QuickAmountsProps} props - Component props
 * @param {QuickAmount[]} props.amounts - Array of quick amount options
 * @param {Function} props.onAmountPress - Callback when an amount is selected
 * @param {Function} props.onMaxPress - Optional callback for max amount selection
 * @returns {JSX.Element} Rendered quick amounts selection component
 */
const QuickAmounts = ({
  amounts,
  onAmountPress,
  onMaxPress,
}: QuickAmountsProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.content}>
      {amounts.map((amount, index: number) => (
        <Amount
          amount={amount}
          onPress={onAmountPress}
          onMaxPress={onMaxPress}
          key={index}
        />
      ))}
    </View>
  );
};

export default QuickAmounts;
