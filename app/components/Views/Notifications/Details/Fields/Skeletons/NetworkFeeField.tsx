import React from 'react';
import { DimensionValue, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface SkeletonPlaceholderItem {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius: number;
  marginTop: number;
}

/**
 * NetworkFeeFieldSkeleton component renders a skeleton placeholder for network fee fields
 * Used as a loading state while network fee information is being fetched
 * @returns {JSX.Element} A skeleton placeholder with two items in a row layout
 */
export default function NetworkFeeFieldSkeleton() {
  const skeletonProps: SkeletonPlaceholderItem = {
    width: 32,
    height: 45,
    borderRadius: 6,
    marginTop: 8,
  };

  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={8}>
        <SkeletonPlaceholder.Item {...skeletonProps} />
        <SkeletonPlaceholder.Item
          {...skeletonProps}
          width={Dimensions.get('screen').width - 68}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
