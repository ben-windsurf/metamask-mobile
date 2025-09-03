import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../../Box/Box';
import Text, {
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../component-library/hooks';
import { FlexDirection, AlignItems } from '../../Box/box.types';
import AvatarNetwork from '../../../../component-library/components/Avatars/Avatar/variants/AvatarNetwork';
import { getNetworkImageSource } from '../../../../util/networks';
import { CaipChainId, Hex } from '@metamask/utils';

/**
 * Creates styles for the NetworkRow component
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    nameWrapper: {
      flex: 1,
    },
    childrenWrapper: {
      flex: 1,
    },
  });

interface NetworkRowProps {
  chainId: Hex | CaipChainId;
  chainName: string;
  children?: React.ReactNode;
}

/**
 * NetworkRow component displays a network with its avatar and name
 * Used in bridge and network selection interfaces to show network information
 * @param {Object} props - Component props
 * @param {Hex | CaipChainId} props.chainId - The chain ID for the network
 * @param {string} props.chainName - The display name of the network
 * @param {React.ReactNode} props.children - Optional child components to render on the right side
 * @returns {JSX.Element} The rendered network row component
 */
export const NetworkRow: React.FC<NetworkRowProps> = ({
  chainId,
  chainName,
  children,
}) => {
  const { styles } = useStyles(createStyles, {});

  const imageSource = getNetworkImageSource({ chainId });

  return (
    <Box
      style={styles.wrapper}
      flexDirection={FlexDirection.Row}
      alignItems={AlignItems.center}
    >
      <Box
        style={styles.nameWrapper}
        flexDirection={FlexDirection.Row}
        alignItems={AlignItems.center}
        gap={8}
      >
        <AvatarNetwork imageSource={imageSource} />
        <Text variant={TextVariant.BodyLGMedium}>{chainName}</Text>
      </Box>

      {children ? (
        <Box
          style={styles.childrenWrapper}
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.flexEnd}
        >
          {children}
        </Box>
      ) : null}
    </Box>
  );
};
