import React, { useCallback, useEffect, useState } from 'react';

import { ApproveComponentIDs } from '../../../../../../e2e/selectors/Confirmation/ConfirmationView.selectors';
import { ApproveMethod } from '../../types/approve';
import { validateSpendingCap } from '../../utils/validations/approve';
import { TextFieldWithLabel } from '../UI/text-field-with-label';

/**
 * SpendingCapInput component provides an input field for setting token spending limits
 * Validates spending cap values and provides real-time error feedback for approval transactions
 * @param {Object} props - Component props
 * @param {ApproveMethod} props.approveMethod - The approval method being used
 * @param {string} props.initialValue - Initial spending cap value
 * @param {number} props.decimals - Token decimal places for validation
 * @param {function} props.onChange - Callback when spending cap value changes
 * @param {function} props.onErrorChange - Callback when validation error state changes
 * @returns {JSX.Element} The rendered spending cap input component
 */
export const SpendingCapInput = ({
  approveMethod,
  initialValue,
  decimals,
  onChange,
  onErrorChange,
}: {
  approveMethod: ApproveMethod;
  initialValue: string;
  decimals: number;
  onChange: (value: string) => void;
  onErrorChange: (error: string | boolean) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | boolean>(false);

  const validateSpendingCapCallback = useCallback(
    (newSpendingCap: string) => {
      const validationError = validateSpendingCap(
        newSpendingCap,
        decimals,
        approveMethod,
      );
      setError(validationError);
    },
    [approveMethod, decimals],
  );

  const handleChange = useCallback(
    (text: string) => {
      const newSpendingCap = text.trim();
      validateSpendingCapCallback(newSpendingCap);
      setValue(newSpendingCap);
      onChange(newSpendingCap);
    },
    [onChange, validateSpendingCapCallback],
  );

  useEffect(() => {
    onErrorChange(error);
  }, [error, onErrorChange]);

  return (
    <TextFieldWithLabel
      error={error}
      inputType="spending-cap"
      keyboardType="numeric"
      onChangeText={handleChange}
      testID={ApproveComponentIDs.EDIT_SPENDING_CAP_INPUT}
      value={value}
    />
  );
};
