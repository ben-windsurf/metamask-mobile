import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Button, {
  ButtonSize,
  ButtonVariants,
} from '../../../../../component-library/components/Buttons/Button';
import Text from '../../../../../component-library/components/Texts/Text';
import { selectSelectedInternalAccount } from '../../../../../selectors/accountsController';
import { useStyles } from '../../../../hooks/useStyles';
import useRouteParams from '../../hooks/send/useRouteParams';
import useSendActions from '../../hooks/send/useSendActions';
import useSendDisabled from '../../hooks/send/useSendDisabled';
import Amount from './amount';
import Asset from './asset';
import To from './to';
import styleSheet from './send.styles';

/**
 * Send component provides the main interface for sending transactions in MetaMask Mobile
 * Displays asset selection, from/to addresses, amount input, and confirmation buttons
 * Integrates with Redux state for account management and transaction handling
 * @returns {JSX.Element} The rendered send transaction interface
 */
export const Send = () => {
  const from = useSelector(selectSelectedInternalAccount);
  const { styles } = useStyles(styleSheet, {});
  const { handleCancelPress, handleSubmitPress } = useSendActions();
  const { sendDisabled } = useSendDisabled();
  useRouteParams();

  return (
    <View style={styles.container}>
      <Asset />
      <View>
        <Text>From:</Text>
        <Text>{from?.address}</Text>
      </View>
      <To />
      <Amount />
      <Button
        label="Cancel"
        onPress={handleCancelPress}
        variant={ButtonVariants.Secondary}
        size={ButtonSize.Lg}
      />
      <Button
        label="Confirm"
        disabled={sendDisabled}
        onPress={handleSubmitPress}
        variant={ButtonVariants.Primary}
        size={ButtonSize.Lg}
      />
    </View>
  );
};
