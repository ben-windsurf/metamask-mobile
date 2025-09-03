import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Hex } from '@metamask/utils';

import { useStyles } from '../../../../../../component-library/hooks';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';
import { strings } from '../../../../../../../locales/i18n';
import { hexWEIToDecGWEI } from '../../../../../../util/conversions';
import { useTransactionMetadataRequest } from '../../../hooks/transactions/useTransactionMetadataRequest';
import { convertGasInputToHexWEI } from '../../../utils/gas';
import { validateGasPrice } from '../../../utils/validations/gas';
import { TextFieldWithLabel } from '../../UI/text-field-with-label';
import styleSheet from './gas-price-input.styles';

/**
 * GasPriceInput component allows users to input and validate gas price values for transactions
 * Provides real-time validation and converts input values to appropriate hex format for transaction processing
 * @param {Object} props - Component props
 * @param {function} props.onChange - Callback function called when gas price value changes, receives hex WEI value
 * @param {function} props.onErrorChange - Callback function called when validation error state changes
 * @returns {JSX.Element} Gas price input field with validation and GWEI unit display
 */
export const GasPriceInput = ({
  onChange,
  onErrorChange,
}: {
  onChange: (value: Hex) => void;
  onErrorChange: (error: string | boolean) => void;
}) => {
  const transactionMeta = useTransactionMetadataRequest();
  const { styles } = useStyles(styleSheet, {});
  const initialGasPrice = hexWEIToDecGWEI(
    transactionMeta?.txParams?.gasPrice,
  ).toString();
  const [value, setValue] = useState(initialGasPrice);
  const [error, setError] = useState<string | boolean>(false);

  const validateGasPriceCallback = useCallback((valueToBeValidated: string) => {
    const validationError = validateGasPrice(valueToBeValidated);
    setError(validationError);
  }, []);

  const handleChange = useCallback(
    (text: string) => {
      validateGasPriceCallback(text);
      setValue(text);
      const updatedGasPrice = convertGasInputToHexWEI(text);
      onChange(updatedGasPrice);
    },
    [onChange, validateGasPriceCallback],
  );

  useEffect(() => {
    onErrorChange(error);
  }, [error, onErrorChange]);

  return (
    <View style={styles.container}>
      <TextFieldWithLabel
        endAccessory={<Text variant={TextVariant.BodySM}>GWEI</Text>}
        error={error}
        inputType="gas-price"
        keyboardType="numeric"
        label={strings('transactions.gas_modal.gas_price')}
        onChangeText={handleChange}
        testID="gas-price-input"
        value={value}
      />
    </View>
  );
};
