import React from 'react';
import { FlatList, View } from 'react-native';
import {
  useAccountProps,
  useNotificationAccountListProps,
} from './AccountsList.hooks';
import NotificationOptionToggle from './NotificationOptionToggle';
import { NotificationSettingsViewSelectorsIDs } from '../../../../../e2e/selectors/Notifications/NotificationSettingsView.selectors';
import { toFormattedAddress } from '../../../../util/address';

/**
 * AccountsList component renders a list of user accounts with notification toggle controls
 * Displays each account with its name, address, and a toggle switch to enable/disable notifications
 * Handles loading states and provides feedback during notification setting updates
 * @returns {JSX.Element} The rendered accounts list with notification toggles
 */
export const AccountsList = () => {
  const { accounts, accountAddresses, accountAvatarType } = useAccountProps();
  const {
    isAnyAccountLoading,
    isAccountLoading,
    isAccountEnabled,
    refetchAccountSettings,
  } = useNotificationAccountListProps(accountAddresses);

  return (
    <View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => `address-${item.address}`}
        renderItem={({ item }) => (
          <NotificationOptionToggle
            key={item.address}
            icon={accountAvatarType}
            title={item.name}
            address={item.address}
            disabledSwitch={isAnyAccountLoading}
            isLoading={isAccountLoading(item.address)}
            isEnabled={isAccountEnabled(item.address)}
            refetchNotificationAccounts={refetchAccountSettings}
            testID={NotificationSettingsViewSelectorsIDs.ACCOUNT_NOTIFICATION_TOGGLE(
              toFormattedAddress(item.address),
            )}
          />
        )}
      />
    </View>
  );
};
