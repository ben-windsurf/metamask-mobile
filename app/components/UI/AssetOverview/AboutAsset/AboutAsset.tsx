import { zeroAddress } from 'ethereumjs-util';
import React from 'react';
import { DimensionValue, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Hex } from '@metamask/utils';
import i18n, { strings } from '../../../../../locales/i18n';
import { useStyles } from '../../../../component-library/hooks';
import Title from '../../../Base/Title';
import useTokenDescriptions, {
  TokenDescriptions,
} from '../../../hooks/useTokenDescriptions';
import { Asset } from '../AssetOverview.types';
import styleSheet from './AboutAsset.styles';
import ContentDisplay from './ContentDisplay';

interface AboutAssetProps {
  asset: Asset;
  chainId: Hex;
}

interface SkeletonPlaceholderItem {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius: number;
  marginBottom: number;
}

/**
 * AboutAsset component displays information about a specific asset/token
 * Shows token descriptions with loading states and localization support
 * @param {AboutAssetProps} props - Component props
 * @param {Asset} props.asset - The asset object containing token information
 * @param {Hex} props.chainId - The chain ID where the asset exists
 * @returns {JSX.Element | null} The rendered about asset component or null if no description
 */
const AboutAsset = ({ asset, chainId }: AboutAssetProps) => {
  const { styles } = useStyles(styleSheet, {});
  const locale: keyof TokenDescriptions = i18n.locale;
  const skeletonProps: SkeletonPlaceholderItem = {
    width: '100%',
    height: 18,
    borderRadius: 6,
    marginBottom: 8,
  };
  const { data: descriptions, isLoading: isDescriptionLoading } =
    useTokenDescriptions({
      address: asset.isETH ? zeroAddress() : asset.address,
      chainId,
    });

  const description = descriptions[locale] || descriptions.en;

  if (!isDescriptionLoading && !description) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Title style={styles.title}>{strings('asset_overview.about')}</Title>
      {isDescriptionLoading ? (
        <View>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item {...skeletonProps} />
            <SkeletonPlaceholder.Item {...skeletonProps} />
            <SkeletonPlaceholder.Item {...skeletonProps} />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <ContentDisplay
          content={description}
          disclaimer={strings('asset_overview.disclaimer')}
        />
      )}
    </View>
  );
};

export default AboutAsset;
