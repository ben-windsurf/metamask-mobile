import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { strings } from '../../../../../../locales/i18n';
import Text, {
  TextVariant,
} from '../../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../../component-library/hooks';
import { selectTransactionState } from '../../../../../reducers/transaction';
import { useConfirmationContext } from '../../context/confirmation-context';
import { useFullScreenConfirmation } from '../../hooks/ui/useFullScreenConfirmation';
import { useTokenAsset } from '../../hooks/useTokenAsset';
import { useTokenAmount } from '../../hooks/useTokenAmount';
import { Hero } from '../UI/hero';
import AnimatedPulse from '../UI/animated-pulse';
import { AvatarTokenWithNetworkBadge } from './avatar-token-with-network-badge';
import styleSheet from './hero-token.styles';

const AssetAmount = ({
  amount,
  styles,
}: {
  amount?: string;
  styles: StyleSheet.NamedStyles<Record<string, unknown>>;
}) => {
  const { displayName } = useTokenAsset();
  const isUnknownToken = displayName === strings('token.unknown');

  return (
    <Text style={styles.assetAmountText} variant={TextVariant.HeadingLG}>
      {amount}{' '}
      <Text
        style={isUnknownToken && styles.assetTextUnknown}
        variant={TextVariant.HeadingLG}
      >
        {displayName}
      </Text>
    </Text>
  );
};

/**
 * HeroToken component displays token information in a prominent hero layout for confirmations
 * Shows token amount, symbol, and fiat value with animated pulse during transaction updates
 * Includes tooltip for precise amounts when values are rounded for display
 * @param {Object} props - Component props
 * @param {string} [props.amountWei] - Token amount in wei format for display calculations
 * @returns {JSX.Element} Hero token display component with amount, symbol, and fiat value
 */
export const HeroToken = ({ amountWei }: { amountWei?: string }) => {
  const { isTransactionValueUpdating } = useConfirmationContext();
  const { isFullScreenConfirmation } = useFullScreenConfirmation();
  const { styles } = useStyles(styleSheet, {
    isFullScreenConfirmation,
  });

  const { maxValueMode } = useSelector(selectTransactionState);

  const { amountPrecise, amount, fiat, isNative } = useTokenAmount({
    amountWei,
  });
  const isRoundedAmount = amountPrecise !== amount;

  return (
    <AnimatedPulse
      isPulsing={isTransactionValueUpdating}
      preventPulse={!maxValueMode || !isNative}
    >
      <Hero
        componentAsset={<AvatarTokenWithNetworkBadge />}
        hasPaddingTop={isFullScreenConfirmation}
        title={<AssetAmount amount={amount} styles={styles} />}
        subtitle={fiat}
        tooltipModalProps={{
          content: amountPrecise,
          isEnabled: isRoundedAmount,
          hasTooltip: true,
          testId: 'token-hero-amount',
          title: strings('send.amount'),
        }}
      />
    </AnimatedPulse>
  );
};
