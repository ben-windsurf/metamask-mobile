/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { BigNumber } from 'bignumber.js';
import { useStyles } from '../../../hooks/useStyles';
import Text, {
  TextColor,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import { strings } from '../../../../../locales/i18n';
import useFiatFormatter from './useFiatFormatter';
import { FIAT_UNAVAILABLE, FiatAmount } from '../types';
import useHideFiatForTestnet from '../../../hooks/useHideFiatForTestnet';
import { shortenString } from '../../../../util/notifications';

/**
 * Creates stylesheet for fiat display components
 * @returns {Object} StyleSheet object with base styling for fiat displays
 */
const styleSheet = () =>
  StyleSheet.create({
    base: {
      paddingRight: 2,
      textAlign: 'right',
    },
  });

const sharedTextProps = {
  color: TextColor.Alternative,
  variant: TextVariant.BodyMD,
} as const;

const FiatNotAvailableDisplay: React.FC = () => {
  const { styles } = useStyles(styleSheet, {});
  return (
    <Text {...sharedTextProps} style={styles.base}>
      {strings('simulation_details.fiat_not_available')}
    </Text>
  );
};

/**
 * Calculates the total fiat value from an array of fiat amounts
 * @param {FiatAmount[]} fiatAmounts - Array of fiat amounts to sum
 * @returns {BigNumber} The total fiat value as a BigNumber
 */
export function calculateTotalFiat(fiatAmounts: FiatAmount[]): BigNumber {
  return fiatAmounts.reduce(
    (total: BigNumber, fiat) =>
      total.plus(
        fiat === FIAT_UNAVAILABLE ? new BigNumber(0) : new BigNumber(fiat),
      ),
    new BigNumber(0),
  );
}

/**
 * Displays the fiat value of a single balance change.
 *
 * @param props - Properties object.
 * @param props.fiatAmount - The fiat amount to display.
 */

interface IndividualFiatDisplayProps extends ViewProps {
  fiatAmount: BigNumber | FiatAmount;
  shorten?: boolean;
}

/**
 * Component that displays an individual fiat amount with optional shortening
 * Handles unavailable fiat values and testnet hiding
 * @param {IndividualFiatDisplayProps} props - Component props
 * @returns {JSX.Element|null} Rendered fiat display or null if hidden
 */
export const IndividualFiatDisplay: React.FC<IndividualFiatDisplayProps> = ({
  fiatAmount,
  shorten = true,
}) => {
  const hideFiatForTestnet = useHideFiatForTestnet();
  const { styles } = useStyles(styleSheet, {});
  const fiatFormatter = useFiatFormatter();

  if (hideFiatForTestnet) {
    return null;
  }

  if (fiatAmount === FIAT_UNAVAILABLE) {
    return <FiatNotAvailableDisplay />;
  }
  const absFiat = new BigNumber(fiatAmount).abs();

  const absFiatFormatted = shorten
    ? shortenString(fiatFormatter(absFiat), {
        truncatedCharLimit: 15,
        truncatedStartChars: 15,
        truncatedEndChars: 0,
        skipCharacterInEnd: true,
      })
    : fiatFormatter(absFiat);

  return (
    <Text {...sharedTextProps} style={styles.base} variant={TextVariant.BodySM}>
      {absFiatFormatted}
    </Text>
  );
};

/**
 * Displays the total fiat value of a list of balance changes.
 *
 * @param props - Properties object.
 * @param props.fiatAmounts - The list of fiat amounts to sum.
 */
/**
 * Component that displays the total fiat value of multiple amounts
 * Shows formatted total with currency or unavailable message
 * @param {Object} props - Component props
 * @param {FiatAmount[]} props.fiatAmounts - Array of fiat amounts to sum and display
 * @returns {JSX.Element|null} Rendered total fiat display or null if hidden
 */
export const TotalFiatDisplay: React.FC<{
  fiatAmounts: FiatAmount[];
}> = ({ fiatAmounts }) => {
  const hideFiatForTestnet = useHideFiatForTestnet();
  const { styles } = useStyles(styleSheet, {});
  const fiatFormatter = useFiatFormatter();
  const totalFiat = calculateTotalFiat(fiatAmounts);

  if (hideFiatForTestnet) {
    return null;
  }

  return totalFiat.eq(0) ? (
    <FiatNotAvailableDisplay />
  ) : (
    <Text {...sharedTextProps} variant={TextVariant.BodySM} style={styles.base}>
      {strings('simulation_details.total_fiat', {
        currency: fiatFormatter(totalFiat.abs()),
      })}
    </Text>
  );
};
