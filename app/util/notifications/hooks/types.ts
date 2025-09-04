import type { InternalAccount } from '@metamask/keyring-internal-api';
import { KeyringTypes } from '@metamask/keyring-controller';

/**
 * Return type for the enable MetaMetrics hook.
 * @interface EnableMetametricsReturn
 * @property enableMetametrics - Function to enable MetaMetrics analytics
 * @property loading - Whether the enable operation is in progress
 * @property error - Error message if the operation failed
 */
export interface EnableMetametricsReturn {
  enableMetametrics: () => Promise<string | undefined>;
  loading: boolean;
  error?: string;
}

/**
 * Return type for the disable MetaMetrics hook.
 * @interface DisableMetametricsReturn
 * @property disableMetametrics - Function to disable MetaMetrics analytics
 * @property loading - Whether the disable operation is in progress
 * @property error - Error message if the operation failed
 */
export interface DisableMetametricsReturn {
  disableMetametrics: () => Promise<string | undefined>;
  loading: boolean;
  error?: string;
}

/**
 * Extended account type that includes additional display and keyring information.
 * @type AccountType
 * @property balance - The account's balance as a string
 * @property keyring - The type of keyring managing this account
 * @property label - Display label for the account
 */
export type AccountType = InternalAccount & {
  balance: string;
  keyring: KeyringTypes;
  label: string;
};

/**
 * Return type for the switch Snap notifications change hook.
 * @interface SwitchSnapNotificationsChangeReturn
 * @property onChange - Function to handle Snap notification state changes
 * @property error - Error message if the operation failed
 */
export interface SwitchSnapNotificationsChangeReturn {
  onChange: (state: boolean) => void;
  error?: string;
}

/**
 * Return type for the switch feature announcements change hook.
 * @interface SwitchFeatureAnnouncementsChangeReturn
 * @property onChange - Function to handle feature announcement state changes
 * @property error - Error message if the operation failed
 */
export interface SwitchFeatureAnnouncementsChangeReturn {
  onChange: (state: boolean) => void;
  error?: string;
}

/**
 * Return type for the switch push notifications hook.
 * @interface SwitchPushNotificationsReturn
 * @property onChange - Function to handle push notification state changes for specific UUIDs
 * @property error - Error message if the operation failed
 */
export interface SwitchPushNotificationsReturn {
  onChange: (UUIDS: string[], state: boolean) => void;
  error?: string;
}

/**
 * Data structure for account notification states indexed by address.
 * @interface UseSwitchAccountNotificationsData
 * @property [address] - Boolean indicating notification state for each account address
 */
export interface UseSwitchAccountNotificationsData {
  [address: string]: boolean;
}

/**
 * Return type for the switch account notifications hook.
 * @interface SwitchAccountNotificationsReturn
 * @property switchAccountNotifications - Function to switch account notification settings
 * @property isLoading - Whether the switch operation is in progress
 * @property error - Error message if the operation failed
 */
export interface SwitchAccountNotificationsReturn {
  switchAccountNotifications: () => Promise<string | undefined>;
  isLoading: boolean;
  error?: string;
}

/**
 * Return type for the switch account notifications change hook.
 * @interface SwitchAccountNotificationsChangeReturn
 * @property onChange - Function to handle account notification state changes for multiple addresses
 * @property error - Error message if the operation failed
 */
export interface SwitchAccountNotificationsChangeReturn {
  onChange: (addresses: string[], state: boolean) => void;
  error?: string;
}
