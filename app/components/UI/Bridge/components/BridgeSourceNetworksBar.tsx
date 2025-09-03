import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../../Box/Box';
import Text, {
  TextColor,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../component-library/hooks';
import { Theme } from '../../../../util/theme/models';
import { CaipChainId, Hex } from '@metamask/utils';
import { selectNetworkConfigurations } from '../../../../selectors/networkController';
import { getNetworkImageSource } from '../../../../util/networks';
import { FlexDirection, AlignItems, JustifyContent } from '../../Box/box.types';
import { strings } from '../../../../../locales/i18n';
import { selectEnabledSourceChains } from '../../../../core/redux/slices/bridge';
import { IconName } from '../../../../component-library/components/Icons/Icon';
import Button, {
  ButtonVariants,
} from '../../../../component-library/components/Buttons/Button';
import Routes from '../../../../constants/navigation/Routes';
import { useNavigation } from '@react-navigation/native';
import AvatarNetwork from '../../../../component-library/components/Avatars/Avatar/variants/AvatarNetwork/AvatarNetwork';
import { AvatarSize } from '../../../../component-library/components/Avatars/Avatar';

/**
 * Creates styles for the BridgeSourceNetworksBar component
 * @param params - Style parameters containing theme
 * @param params.theme - Theme object for styling
 * @returns StyleSheet object with component styles
 */
const createStyles = (params: { theme: Theme }) => {
  const { theme } = params;
  return StyleSheet.create({
    networksButton: {
      borderColor: theme.colors.border.muted,
    },
    avatarContainer: {},
    avatarNetwork: {
      marginRight: 0,
    },
    networkOverflowCircle: {
      backgroundColor: theme.colors.overlay.default,
      width: 16,
      height: 16,
      borderRadius: 8,
      marginLeft: -8,
    },
  });
};

/**
 * Maximum number of network icons to display before showing overflow indicator
 */
export const MAX_NETWORK_ICONS = 3;

interface SourceNetworksButtonProps {
  networksToShow: { chainId: Hex | CaipChainId }[];
  networkConfigurations: ReturnType<typeof selectNetworkConfigurations>;
  selectedSourceChainIds: (Hex | CaipChainId)[];
  enabledSourceChains: ReturnType<typeof selectEnabledSourceChains>;
  onPress?: () => void;
}

/**
 * BridgeSourceNetworksBar component displays selected source networks for bridge operations
 * Shows network avatars with overflow indicator and network count text
 * Provides navigation to network selector when pressed
 * @param props - Component props
 * @param props.networksToShow - Array of networks to display as avatars
 * @param props.networkConfigurations - Network configuration data
 * @param props.selectedSourceChainIds - Array of selected source chain IDs
 * @param props.enabledSourceChains - Array of enabled source chains
 * @param props.onPress - Optional custom press handler
 * @returns JSX element representing the source networks bar
 */
export const BridgeSourceNetworksBar: React.FC<SourceNetworksButtonProps> = ({
  networksToShow,
  networkConfigurations,
  selectedSourceChainIds,
  enabledSourceChains,
  onPress,
}) => {
  const { styles } = useStyles(createStyles, {});
  const navigation = useNavigation();

  let networkText = '';
  if (selectedSourceChainIds.length === enabledSourceChains.length) {
    networkText = strings('bridge.all_networks');
  } else if (selectedSourceChainIds.length === 1) {
    networkText = strings('bridge.one_network');
  } else {
    networkText = strings('bridge.num_networks', {
      numNetworks: selectedSourceChainIds.length,
    });
  }

  const navigateToNetworkSelector = () => {
    navigation.navigate(Routes.BRIDGE.MODALS.ROOT, {
      screen: Routes.BRIDGE.MODALS.SOURCE_NETWORK_SELECTOR,
    });
  };

  const renderSourceNetworks = useCallback(
    () =>
      networksToShow.map(({ chainId }) => (
        <Box key={chainId} style={styles.avatarContainer}>
          <AvatarNetwork
            key={chainId}
            imageSource={getNetworkImageSource({ chainId })}
            name={networkConfigurations[chainId]?.name}
            size={AvatarSize.Xs}
            style={styles.avatarNetwork}
          />
        </Box>
      )),
    [networkConfigurations, styles, networksToShow],
  );

  return (
    <Button
      onPress={onPress ?? navigateToNetworkSelector}
      variant={ButtonVariants.Secondary}
      label={
        <Box
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.center}
          gap={4}
        >
          <Box
            flexDirection={FlexDirection.Row}
            alignItems={AlignItems.center}
            gap={-8}
          >
            {renderSourceNetworks()}
            {selectedSourceChainIds.length > MAX_NETWORK_ICONS && (
              <Box
                style={styles.networkOverflowCircle}
                justifyContent={JustifyContent.center}
                alignItems={AlignItems.center}
              >
                <Text variant={TextVariant.BodyXS} color={TextColor.Inverse}>
                  +{selectedSourceChainIds.length - MAX_NETWORK_ICONS}
                </Text>
              </Box>
            )}
          </Box>
          <Text>{networkText}</Text>
        </Box>
      }
      style={styles.networksButton}
      endIconName={IconName.ArrowDown}
    />
  );
};
