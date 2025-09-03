import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { strings } from '../../../../../../../locales/i18n';
import KeyValueRow from '../../../../../../component-library/components-temp/KeyValueRow';
import Avatar, {
  AvatarVariant,
  AvatarSize,
} from '../../../../../../component-library/components/Avatars/Avatar';
import Text from '../../../../../../component-library/components/Texts/Text';
import { selectSelectedInternalAccount } from '../../../../../../selectors/accountsController';
import { useStyles } from '../../../../../hooks/useStyles';
import Card from '../../../../../../component-library/components/Cards/Card';
import styleSheet from './AccountCard.styles';
import images from '../../../../../../images/image-icons';
import AccountTag from '../AccountTag/AccountTag';
import { selectNetworkName } from '../../../../../../selectors/networkInfos';
import { AccountCardProps } from './AccountCard.types';
import ContractTag from '../ContractTag/ContractTag';
import { RootState } from '../../../../BasicFunctionality/BasicFunctionalityModal/BasicFunctionalityModal.test';
import useVaultMetadata from '../../../hooks/useVaultMetadata';

/**
 * AccountCard component displays account and contract information for staking confirmation
 * Shows the selected account, contract details, and network information in a card layout
 * @param {AccountCardProps} props - Component props
 * @param {string} props.contractName - Name of the staking contract
 * @param {string} props.primaryLabel - Label for the account section
 * @param {string} props.secondaryLabel - Label for the contract section
 * @param {string} props.chainId - Chain ID for vault metadata lookup
 * @returns {JSX.Element} Rendered account card with account, contract, and network details
 */
const AccountCard = ({
  contractName,
  primaryLabel,
  secondaryLabel,
  chainId,
}: AccountCardProps) => {
  const { styles } = useStyles(styleSheet, {});

  const account = useSelector(selectSelectedInternalAccount);

  const networkName = useSelector(selectNetworkName);

  const useBlockieIcon = useSelector(
    (state: RootState) => state.settings.useBlockieIcon,
  );

  const { vaultMetadata } = useVaultMetadata(chainId);

  return (
    <View>
      <Card testID="account-card" style={styles.cardGroupTop} disabled>
        {account && (
          <KeyValueRow
            field={{ label: { text: primaryLabel } }}
            value={{
              label: (
                <AccountTag
                  accountAddress={account?.address}
                  accountName={account.metadata.name}
                  useBlockieIcon={useBlockieIcon}
                />
              ),
            }}
          />
        )}
        <KeyValueRow
          field={{
            label: { text: secondaryLabel },
          }}
          value={{
            label: (
              <ContractTag
                contractAddress={vaultMetadata?.vaultAddress ?? contractName}
                contractName={contractName}
                useBlockieIcon={useBlockieIcon}
              />
            ),
          }}
        />
      </Card>
      <Card style={styles.cardGroupBottom} disabled>
        <KeyValueRow
          field={{ label: { text: strings('asset_details.network') } }}
          value={{
            label: (
              <View style={styles.networkKeyValueRow}>
                <Avatar
                  variant={AvatarVariant.Network}
                  imageSource={images.ETHEREUM}
                  size={AvatarSize.Xs}
                />
                <Text>{networkName}</Text>
              </View>
            ),
          }}
        />
      </Card>
    </View>
  );
};

export default AccountCard;
