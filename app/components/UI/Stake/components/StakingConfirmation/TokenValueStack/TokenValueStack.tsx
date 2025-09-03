import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Badge, {
  BadgeVariant,
} from '../../../../../../component-library/components/Badges/Badge';
import BadgeWrapper, {
  BadgePosition,
} from '../../../../../../component-library/components/Badges/BadgeWrapper';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../component-library/components/Texts/Text';
import { selectEvmNetworkName } from '../../../../../../selectors/networkInfos';
import { useStyles } from '../../../../../hooks/useStyles';
import NetworkMainAssetLogo from '../../../../NetworkMainAssetLogo';
import styleSheet from './TokenValueStack.styles';
import images from '../../../../../../images/image-icons';
import { TokenValueStackProps } from './TokenValueStack.types';
import { renderFromWei } from '../../../../../../util/number';

/**
 * TokenValueStack component displays token amount and fiat value with network badge
 * Shows the token amount in wei format with symbol and corresponding fiat value
 * @param {TokenValueStackProps} props - Component props
 * @param {string} props.amountWei - Token amount in wei format
 * @param {string} props.amountFiat - Fiat value representation of the token amount
 * @param {string} props.tokenSymbol - Symbol of the token (e.g., ETH)
 * @param {Object} props.style - Additional styles to apply to the container
 * @returns {JSX.Element} Rendered token value stack with network badge and balance display
 */
const TokenValueStack = ({
  amountWei,
  amountFiat,
  tokenSymbol,
  style,
}: TokenValueStackProps) => {
  const { styles } = useStyles(styleSheet, {});

  const networkName = useSelector(selectEvmNetworkName);

  return (
    <View style={[styles.tokenValueStackContainer, style]}>
      <BadgeWrapper
        style={styles.badgeWrapper}
        badgePosition={BadgePosition.BottomRight}
        badgeElement={
          <Badge
            variant={BadgeVariant.Network}
            imageSource={images.ETHEREUM}
            name={networkName}
          />
        }
      >
        <NetworkMainAssetLogo style={styles.ethLogo} />
      </BadgeWrapper>
      <View style={styles.balancesContainer}>
        <Text variant={TextVariant.HeadingLG}>
          {renderFromWei(amountWei)} {tokenSymbol}
        </Text>
        <Text color={TextColor.Alternative}>{amountFiat}</Text>
      </View>
    </View>
  );
};

export default TokenValueStack;
