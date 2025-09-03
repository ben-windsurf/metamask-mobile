/* eslint-disable react/prop-types */
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSelector } from 'react-redux';
import { Hex } from '@metamask/utils';

import Text, {
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import AvatarNetwork from '../../../../component-library/components/Avatars/Avatar/variants/AvatarNetwork';
import { AvatarSize } from '../../../../component-library/components/Avatars/Avatar/Avatar.types';
import { NetworkList } from '../../../../util/networks';
import { useStyles } from '../../../hooks/useStyles';
import Name from '../../Name/Name';
import { NameType } from '../../Name/Name.types';
import { AssetIdentifier, AssetType } from '../types';
import styleSheet from './AssetPill.styles';
import { selectEvmNetworkConfigurationsByChainId } from '../../../../selectors/networkController';

interface AssetPillProperties extends ViewProps {
  asset: AssetIdentifier;
}

/**
 * Gets the network image source for a given chain ID
 * @param chainId - The chain ID to get the network image for
 * @returns The network image source or null if not found
 */
const getNetworkImage = (chainId: Hex) => {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const network: any = Object.values(NetworkList).find(
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (nw: any) => nw.chainId === chainId,
  );
  return network?.imageSource || null;
};

/**
 * Component that renders a pill for native assets with network avatar and currency symbol
 * @param asset - The native asset identifier containing chain ID
 * @returns JSX element displaying the native asset pill
 */
const NativeAssetPill: React.FC<AssetPillProperties> = ({ asset }) => {
  const { styles } = useStyles(styleSheet, {});
  const imageSource = getNetworkImage(asset.chainId);

  const networkConfigurationsByChainId = useSelector(
    selectEvmNetworkConfigurationsByChainId,
  );

  const { nativeCurrency } =
    networkConfigurationsByChainId[asset.chainId] || {};

  return (
    <View style={styles.nativeAssetPill}>
      <AvatarNetwork
        testID="simulation-details-asset-pill-avatar-network"
        size={AvatarSize.Xs}
        name={nativeCurrency}
        imageSource={imageSource}
      />
      <Text variant={TextVariant.BodyMD}>{nativeCurrency}</Text>
    </View>
  );
};

/**
 * Component that renders an asset pill, displaying either a native asset or token information
 * Conditionally renders NativeAssetPill for native assets or Name component for tokens
 * @param asset - The asset identifier containing type, address, and chain ID
 * @returns JSX element displaying the appropriate asset pill variant
 */
const AssetPill: React.FC<AssetPillProperties> = ({ asset }) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.assetPill}>
      {asset.type === AssetType.Native ? (
        <NativeAssetPill asset={asset} />
      ) : (
        <Name
          preferContractSymbol
          testID="simulation-details-asset-pill-name"
          type={NameType.EthereumAddress}
          value={asset.address}
          variation={asset.chainId}
        />
      )}
    </View>
  );
};

export default AssetPill;
