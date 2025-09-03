import React from 'react';

import { useStyles } from '../../../../../../component-library/hooks';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';
import TextField, {
  TextFieldSize,
} from '../../../../../../component-library/components/Form/TextField';
import { TextFieldProps } from '../../../../../../component-library/components/Form/TextField/TextField.types';
import styleSheet from './text-field-with-label.styles';

export type TextFieldWithLabelProps = {
  error: string | boolean;
  inputType: string;
  label?: string;
} & TextFieldProps;

/**
 * TextFieldWithLabel component renders a text input field with an optional label and error message
 * Used in confirmation flows to provide labeled form inputs with validation feedback
 * @param {TextFieldWithLabelProps} props - Component props including error state, input type, and optional label
 * @returns {JSX.Element} Rendered text field with label and error display
 */
export const TextFieldWithLabel = (props: TextFieldWithLabelProps) => {
  const { error, inputType, label, ...restProps } = props;
  const { styles, theme } = useStyles(styleSheet, {});

  return (
    <>
      {label && (
        <Text variant={TextVariant.BodyMD} style={styles.label}>
          {label}
        </Text>
      )}
      <TextField
        autoCapitalize="none"
        autoCorrect={false}
        size={TextFieldSize.Lg}
        {...restProps}
      />
      {error && (
        <Text
          color={theme.colors.error.default}
          style={styles.error}
          testID={`${inputType}-error`}
          variant={TextVariant.BodySM}
        >
          {error}
        </Text>
      )}
    </>
  );
};
