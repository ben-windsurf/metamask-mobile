import React from 'react';
import TagBase, {
  TagSeverity,
  TagShape,
} from '../../../../../../component-library/base-components/TagBase';
import Text from '../../../../../../component-library/components/Texts/Text';
import { ContractTagProps } from './ContractTag.types';
import Avatar, {
  AvatarVariant,
  AvatarSize,
  AvatarAccountType,
} from '../../../../../../component-library/components/Avatars/Avatar';

/**
 * ContractTag component displays a contract name with an associated avatar icon
 * Renders as a pill-shaped tag with contract avatar and name for staking confirmation
 * @param {ContractTagProps} props - Component props
 * @param {string} props.contractName - The name of the contract to display
 * @param {string} props.contractAddress - The contract address for avatar generation
 * @param {boolean} props.useBlockieIcon - Whether to use blockie or jazzicon style (default: false)
 * @returns {JSX.Element} A tag component with contract avatar and name
 */
const ContractTag = ({
  contractName,
  contractAddress,
  useBlockieIcon = false,
}: ContractTagProps) => (
  <TagBase
    startAccessory={
      <Avatar
        variant={AvatarVariant.Account}
        size={AvatarSize.Xs}
        accountAddress={contractAddress}
        type={
          useBlockieIcon
            ? AvatarAccountType.Blockies
            : AvatarAccountType.JazzIcon
        }
      />
    }
    shape={TagShape.Pill}
    severity={TagSeverity.Neutral}
  >
    <Text>{contractName}</Text>
  </TagBase>
);

export default ContractTag;
