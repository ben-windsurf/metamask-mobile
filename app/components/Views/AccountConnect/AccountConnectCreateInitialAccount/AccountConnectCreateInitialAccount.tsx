import React, { useCallback } from 'react';
import Text, {
  TextColor,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import ButtonLink from '../../../../component-library/components/Buttons/Button/variants/ButtonLink';
import { strings } from '../../../../../locales/i18n';
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from '../../../UI/Box/box.types';
import { Box } from '../../../UI/Box/Box';
import styleSheet from './AccountConnectCreateInitialAccount.styles';
import { useStyles } from '../../../../component-library/hooks';
import { AccountConnectSelectorsIDs } from '../../../../../e2e/selectors/wallet/AccountConnect.selectors';

interface AccountConnectCreateInitialAccountProps {
  onCreateAccount: () => void;
}

/**
 * AccountConnectCreateInitialAccount component displays a prompt for creating the first account
 * when no accounts exist during the account connection flow. Shows descriptive text and a
 * create account button to guide users through initial account setup.
 * @param {AccountConnectCreateInitialAccountProps} props - Component props
 * @param {() => void} props.onCreateAccount - Callback function triggered when user creates an account
 * @returns {JSX.Element} The rendered create initial account component
 */
export const AccountConnectCreateInitialAccount = ({
  onCreateAccount,
}: AccountConnectCreateInitialAccountProps) => {
  const { styles } = useStyles(styleSheet, {});

  const handleAccountCreation = useCallback(() => {
    onCreateAccount();
  }, [onCreateAccount]);

  return (
    <Box
      style={styles.container}
      gap={8}
      flexDirection={FlexDirection.Column}
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
    >
      <Text
        variant={TextVariant.BodyMD}
        color={TextColor.Alternative}
        style={styles.description}
      >
        {strings('accounts.account_connect_create_initial_account.description')}
      </Text>
      <ButtonLink
        testID={AccountConnectSelectorsIDs.CREATE_ACCOUNT_BUTTON}
        style={styles.button}
        label={strings(
          'accounts.account_connect_create_initial_account.button',
        )}
        onPress={handleAccountCreation}
      />
    </Box>
  );
};
