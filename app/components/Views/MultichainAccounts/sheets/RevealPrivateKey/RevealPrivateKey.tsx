import React from 'react';
import { strings } from '../../../../../../locales/i18n';
import { InternalAccount } from '@metamask/keyring-internal-api';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RevealPrivateCredential } from '../../../RevealPrivateCredential';
import { PRIVATE_KEY } from '../../../RevealPrivateCredential/RevealPrivateCredential';
import SheetHeader from '../../../../../component-library/components/Sheet/SheetHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleSheet from './RevealPrivateKey.styles';
import { useStyles } from '../../../../hooks/useStyles';

interface RootNavigationParamList extends ParamListBase {
  RevealPrivateKey: {
    account: InternalAccount;
  };
}

type RevealPrivateKeyProp = RouteProp<
  RootNavigationParamList,
  'RevealPrivateKey'
>;

/**
 * RevealPrivateKey component displays a sheet for revealing an account's private key
 * Provides a secure interface for users to view their private key with proper authentication
 * Used in multichain account management for credential access
 * @returns {JSX.Element} The rendered reveal private key sheet component
 */
export const RevealPrivateKey = () => {
  const { styles } = useStyles(styleSheet, {});
  const navigation = useNavigation();
  const route = useRoute<RevealPrivateKeyProp>();
  const { account } = route.params;
  const handleOnBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <SheetHeader
        onBack={handleOnBack}
        title={strings('multichain_accounts.reveal_private_key.title')}
      />
      <RevealPrivateCredential
        credentialName={PRIVATE_KEY}
        navigation={navigation}
        cancel={handleOnBack}
        route={{
          key: 'RevealPrivateCredential',
          name: 'RevealPrivateCredential',
          params: {
            credentialName: PRIVATE_KEY,
            shouldUpdateNav: false,
            selectedAccount: account,
          },
        }}
      />
    </SafeAreaView>
  );
};
