import React from 'react';
import { View } from 'react-native';
import TagBase, {
  TagSeverity,
  TagShape,
} from '../../../../../../component-library/base-components/TagBase';
import Avatar, {
  AvatarVariant,
  AvatarSize,
} from '../../../../../../component-library/components/Avatars/Avatar';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../component-library/components/Texts/Text';
import Card from '../../../../../../component-library/components/Cards/Card';
import { renderFromWei } from '../../../../../../util/number';
import { useStyles } from '../../../../../hooks/useStyles';
import styleSheet from './YouReceiveCard.styles';
import ethLogo from '../../../../../../images/ethereum.png';
import { YouReceiveCardProps } from './YouReceiveCard.types';
import { strings } from '../../../../../../../locales/i18n';

/**
 * YouReceiveCard component displays the estimated amount of ETH the user will receive from staking
 * Shows both the ETH amount and its fiat equivalent in a card format with success styling
 * @param {YouReceiveCardProps} props - Component props
 * @param {string} props.amountWei - The amount of ETH in wei that will be received
 * @param {string} props.amountFiat - The fiat equivalent of the ETH amount
 * @returns {JSX.Element} Card component showing the estimated ETH rewards
 */
const YouReceiveCard = ({ amountWei, amountFiat }: YouReceiveCardProps) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <Card style={styles.changesCard} disabled>
      <View style={styles.estimatedChangesWrapper}>
        <Text variant={TextVariant.BodyMDMedium}>
          {strings('stake.estimated_changes')}
        </Text>
      </View>
      <View style={styles.youReceiveWrapper}>
        <Text variant={TextVariant.BodyMDMedium}>
          {strings('stake.you_receive')}
        </Text>
        <View style={styles.youReceiveRightSide}>
          <View style={styles.flexRow}>
            <TagBase severity={TagSeverity.Success} shape={TagShape.Pill}>
              <Text
                variant={TextVariant.BodyMDMedium}
                color={TextColor.Success}
              >
                {`+ ${renderFromWei(amountWei)}`}
              </Text>
            </TagBase>
            <TagBase
              severity={TagSeverity.Neutral}
              shape={TagShape.Pill}
              startAccessory={
                <Avatar
                  variant={AvatarVariant.Network}
                  imageSource={ethLogo}
                  size={AvatarSize.Xs}
                />
              }
            >
              <Text>ETH</Text>
            </TagBase>
          </View>
          <Text style={styles.youReceiveFiat} variant={TextVariant.BodySM}>
            ${amountFiat}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default YouReceiveCard;
