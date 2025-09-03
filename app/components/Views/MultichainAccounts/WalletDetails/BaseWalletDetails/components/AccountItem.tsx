import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { InternalAccount } from '@metamask/keyring-internal-api';
import { useStyles } from '../../../../../hooks/useStyles';
import styleSheet from '../styles';
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from '../../../../../UI/Box/box.types';
import { Box } from '../../../../../UI/Box/Box';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';
import Icon, {
  IconSize,
  IconName,
} from '../../../../../../component-library/components/Icons/Icon';
import Avatar, {
  AvatarAccountType,
  AvatarSize,
  AvatarVariant,
} from '../../../../../../component-library/components/Avatars/Avatar';
import AnimatedSpinner from '../../../../../UI/AnimatedSpinner';
import { WalletDetailsIds } from '../../../../../../../e2e/selectors/MultichainAccounts/WalletDetails';

interface AccountItemProps {
  account: InternalAccount;
  index: number;
  totalItemsCount: number;
  accountBalance?: string;
  isAccountBalanceLoading: boolean;
  accountAvatarType: AvatarAccountType;
  onPress: (account: InternalAccount) => void;
}

/**
 * AccountItem component displays individual account information in wallet details view
 * Shows account avatar, name, balance, and provides navigation to account details
 * Handles loading states and applies appropriate styling based on position in list
 * @param {AccountItemProps} props - Component props
 * @param {InternalAccount} props.account - The account object containing metadata and address
 * @param {number} props.index - Position index of this account in the list
 * @param {number} props.totalItemsCount - Total number of accounts in the list
 * @param {string} props.accountBalance - Formatted balance string for display
 * @param {boolean} props.isAccountBalanceLoading - Loading state for balance data
 * @param {AvatarAccountType} props.accountAvatarType - Type of avatar to display for the account
 * @param {function} props.onPress - Callback function when account item is pressed
 * @returns {JSX.Element} The rendered account item component
 */
export const AccountItem: React.FC<AccountItemProps> = ({
  account,
  index,
  totalItemsCount,
  accountBalance,
  isAccountBalanceLoading,
  accountAvatarType,
  onPress,
}) => {
  const { styles, theme } = useStyles(styleSheet, {});
  const { colors } = theme;

  const boxStyles: ViewStyle[] = [styles.accountBox];

  if (totalItemsCount > 1) {
    if (index === 0) {
      boxStyles.push(styles.firstAccountBox);
    } else if (index === totalItemsCount - 1) {
      boxStyles.push(styles.lastAccountBox);
    } else {
      boxStyles.push(styles.middleAccountBox as ViewStyle);
    }
  }

  return (
    <TouchableOpacity
      key={account.id}
      testID={`${WalletDetailsIds.ACCOUNT_ITEM}_${account.id}`}
      onPress={() => onPress(account)}
    >
      <Box
        style={boxStyles}
        flexDirection={FlexDirection.Row}
        alignItems={AlignItems.center}
        justifyContent={JustifyContent.spaceBetween}
      >
        <Box
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.center}
          gap={8}
        >
          <Avatar
            variant={AvatarVariant.Account}
            size={AvatarSize.Md}
            accountAddress={account.address}
            type={accountAvatarType}
          />
          <Text variant={TextVariant.BodyMDMedium}>
            {account.metadata.name}
          </Text>
        </Box>
        <Box
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.center}
          gap={8}
        >
          {isAccountBalanceLoading ? (
            <AnimatedSpinner />
          ) : (
            <Text style={styles.text} variant={TextVariant.BodyMDMedium}>
              {accountBalance}
            </Text>
          )}
          <Icon
            name={IconName.ArrowRight}
            size={IconSize.Md}
            color={colors.text.alternative}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default AccountItem;
