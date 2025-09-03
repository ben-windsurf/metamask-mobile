import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { CaipChainId } from '@metamask/utils';
import { RootState } from '../../../reducers';
import { useStyles } from '../../../component-library/hooks';
import AvatarGroup from '../../../component-library/components/Avatars/AvatarGroup';
import { AvatarVariant } from '../../../component-library/components/Avatars/Avatar';
import { getActiveNetworksByScopes } from '../../../selectors/multichainNetworkController';
import styleSheet from './AccountNetworkIndicator.styles';
import { getNetworkImageSource } from '../../../util/networks';

/**
 * AccountNetworkIndicator displays network avatars for networks with transaction activity
 * Shows a grouped avatar display of active networks associated with the account
 * @param {Object} props - Component props
 * @param {Object} props.partialAccount - Account information with address and network scopes
 * @param {string} props.partialAccount.address - The account address
 * @param {CaipChainId[]} props.partialAccount.scopes - Array of CAIP chain IDs for the account
 * @returns {JSX.Element} Avatar group component displaying network indicators
 */
const AccountNetworkIndicator = ({
  partialAccount,
}: {
  partialAccount: { address: string; scopes: CaipChainId[] };
}) => {
  const { styles } = useStyles(styleSheet, {});
  const networksWithTransactionActivity = useSelector((state: RootState) =>
    getActiveNetworksByScopes(state, partialAccount),
  );
  const networksWithTransactionActivityAndImageSource =
    networksWithTransactionActivity.map((networkInfo) => ({
      ...networkInfo,
      imageSource: getNetworkImageSource({
        chainId: networkInfo.caipChainId,
      }),
    }));

  return (
    <View style={styles.networkTokensContainer} testID="network-container">
      <AvatarGroup
        avatarPropsList={networksWithTransactionActivityAndImageSource.map(
          (networkInfo, index) => ({
            ...networkInfo,
            variant: AvatarVariant.Network,
            imageSource: networkInfo.imageSource,
            testID: `avatar-group-${index}`,
          }),
        )}
        maxStackedAvatars={4}
      />
    </View>
  );
};

export default AccountNetworkIndicator;
