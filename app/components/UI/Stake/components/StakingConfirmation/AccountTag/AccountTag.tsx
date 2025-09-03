import React from 'react';
import TagBase, {
  TagShape,
  TagSeverity,
} from '../../../../../../component-library/base-components/TagBase';
import Avatar, {
  AvatarVariant,
  AvatarSize,
  AvatarAccountType,
} from '../../../../../../component-library/components/Avatars/Avatar';
import { AccountTagProps } from './AccountTag.types';

/**
 * AccountTag component displays an account identifier with avatar and name/address
 * Used in staking confirmation flows to show which account is being used
 * @param {AccountTagProps} props - Component props
 * @param {string} props.accountAddress - The account address to display
 * @param {string} props.accountName - The account name to display (falls back to address if not provided)
 * @param {boolean} props.useBlockieIcon - Whether to use blockie icon instead of jazzicon (default: false)
 * @returns {JSX.Element} A pill-shaped tag with account avatar and name/address
 */
const AccountTag = ({
  accountAddress,
  accountName,
  useBlockieIcon = false,
}: AccountTagProps) => (
  <TagBase
    startAccessory={
      <Avatar
        variant={AvatarVariant.Account}
        size={AvatarSize.Xs}
        accountAddress={accountAddress}
        type={
          useBlockieIcon
            ? AvatarAccountType.Blockies
            : AvatarAccountType.JazzIcon
        }
      />
    }
    shape={TagShape.Pill}
    severity={TagSeverity.Info}
  >
    {accountName ?? accountAddress}
  </TagBase>
);

export default AccountTag;
