/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-commonjs */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useMemo } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import StyledButton from '../../StyledButton';
import Text from '../../../Base/Text';
import { strings } from '../../../../../locales/i18n';
import { useAssetFromTheme } from '../../../../util/theme';
import { LEDGER_CONFIRMATION_STEP } from './Steps.constants';

const ledgerConnectLightImage = require('../../../../images/ledger-connect-light.png');
const ledgerConnectDarkImage = require('../../../../images/ledger-connect-dark.png');

/**
 * Creates styles for the ConfirmationStep component
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = () =>
  StyleSheet.create({
    buttonContainer: {
      width: '90%',
      position: 'absolute',
      bottom: 0,
    },
    titleText: {
      fontSize: 22,
    },
    ledgerImageStyle: {
      resizeMode: 'cover',
      width: 150,
      overflow: 'visible',
    },
    confirmationViewTitle: {
      marginTop: 30,
      marginHorizontal: 30,
    },
    confirmationActivityIndicator: {
      marginTop: 30,
    },
  });

export interface ConfirmationStepProps {
  onReject: () => void;
}

/**
 * ConfirmationStep component displays the Ledger transaction confirmation interface
 * Shows a Ledger device image, confirmation message, loading indicator, and reject button
 * @param {ConfirmationStepProps} props - Component props
 * @param {Function} props.onReject - Callback function when user rejects the transaction
 * @returns {JSX.Element} The rendered confirmation step component
 */
const ConfirmationStep = ({ onReject }: ConfirmationStepProps) => {
  const styles = useMemo(() => createStyles(), []);
  const ledgerImage = useAssetFromTheme(
    ledgerConnectLightImage,
    ledgerConnectDarkImage,
  );

  return (
    <>
      <Image
        source={ledgerImage}
        style={styles.ledgerImageStyle}
        resizeMode="contain"
      />
      <View
        style={styles.confirmationViewTitle}
        testID={LEDGER_CONFIRMATION_STEP}
      >
        <Text bold big style={styles.titleText}>
          {strings('ledger.confirm_transaction_on_ledger')}
        </Text>
      </View>
      <View style={styles.confirmationActivityIndicator}>
        <ActivityIndicator />
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton type="cancel" onPress={onReject}>
          {strings('transaction.reject')}
        </StyledButton>
      </View>
    </>
  );
};

export default React.memo(ConfirmationStep);
