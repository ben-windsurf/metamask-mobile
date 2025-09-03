import React, { useMemo } from 'react';
import { View } from 'react-native';
import Badge, {
  BadgeVariant,
} from '../../../../../component-library/components/Badges/Badge';
import BadgeWrapper, {
  BadgePosition,
} from '../../../../../component-library/components/Badges/BadgeWrapper';
import { ModalHeaderNFTImage } from '../../../../../util/notifications/notification-states/types/NotificationModalDetails';
import RemoteImage from '../../../../Base/RemoteImage';
import useStyles from '../useStyles';

type NFTImageHeaderProps = ModalHeaderNFTImage;

/**
 * NFTImageHeader component displays an NFT image with a network badge overlay
 * Used in notification details to show NFT collection icons with network identification
 * @param {NFTImageHeaderProps} props - Component props containing NFT image URL and network badge URL
 * @returns {JSX.Element} A view containing the NFT image with a positioned network badge
 */
export default function NFTImageHeader(props: NFTImageHeaderProps) {
  const { styles } = useStyles();

  const badgeSource = useMemo(() => {
    const networkUrl = props.networkBadgeUrl;
    if (typeof networkUrl === 'string') {
      return { uri: networkUrl };
    }
    return networkUrl;
  }, [props.networkBadgeUrl]);

  return (
    <View style={styles.headerImageContainer}>
      {/* Collection Icon + Network Badge */}
      <BadgeWrapper
        badgePosition={BadgePosition.BottomRight}
        badgeElement={
          <Badge
            testID={'badge-element'}
            variant={BadgeVariant.Network}
            imageSource={badgeSource}
            style={styles.customBadgePosition}
          />
        }
        style={styles.badgeWrapper}
      >
        <RemoteImage
          source={{ uri: props.nftImageUrl }}
          style={styles.squareLogoLarge}
          placeholderStyle={styles.squareLogoLargePlaceholder}
        />
      </BadgeWrapper>
    </View>
  );
}
