import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
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
import { strings } from '../../../../../../../locales/i18n';
import { WalletDetailsIds } from '../../../../../../../e2e/selectors/MultichainAccounts/WalletDetails';

interface AddAccountItemProps {
  totalItemsCount: number;
  onPress: () => void;
}

/**
 * AddAccountItem component renders a button for creating new accounts in wallet details
 * Displays an add icon with localized text and handles account creation flow
 * @param {AddAccountItemProps} props - Component props
 * @param {number} props.totalItemsCount - Total number of items to determine styling
 * @param {() => void} props.onPress - Callback function when add account button is pressed
 * @returns {JSX.Element} Rendered add account item component
 */
export const AddAccountItem: React.FC<AddAccountItemProps> = ({
  totalItemsCount,
  onPress,
}) => {
  const { styles, theme } = useStyles(styleSheet, {});
  const { colors } = theme;

  const boxStyles: ViewStyle[] = [styles.accountBox];

  if (totalItemsCount > 1) {
    boxStyles.push(styles.lastAccountBox);
  }

  return (
    <TouchableOpacity
      key="add-account"
      testID={WalletDetailsIds.ADD_ACCOUNT_BUTTON}
      onPress={onPress}
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
          <Icon
            name={IconName.Add}
            size={IconSize.Md}
            color={colors.primary.default}
          />
          <Text
            style={{ color: colors.primary.default }}
            variant={TextVariant.BodyMDMedium}
          >
            {strings('multichain_accounts.wallet_details.create_account')}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default AddAccountItem;
