/**
 * Loading skeleton components for network switcher in the Ramp aggregator
 * Provides skeleton placeholders while network data is being loaded
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import Row from '../../components/Row';
import SkeletonText from '../../components/SkeletonText';
import ListItem from '../../../../../../component-library/components/List/ListItem';
import ListItemColumn, {
  WidthType,
} from '../../../../../../component-library/components/List/ListItemColumn';
import ListItemColumnEnd from '../../components/ListItemColumnEnd';

/**
 * Creates styles for the loading skeleton components
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = () =>
  StyleSheet.create({
    listItem: {
      padding: 0,
    },
  });

/**
 * Individual network loading skeleton item
 * Renders a skeleton placeholder for a single network entry
 * @returns {JSX.Element} Skeleton representation of a network item
 */
function LoadingNetworkSkeleton() {
  const styles = createStyles();

  return (
    <ListItem style={styles.listItem}>
      <ListItemColumn widthType={WidthType.Fill}>
        <SkeletonText large />
      </ListItemColumn>
      <ListItemColumnEnd widthType={WidthType.Fill}>
        <SkeletonText small />
      </ListItemColumnEnd>
    </ListItem>
  );
}

/**
 * Loading skeleton for multiple networks in the network switcher
 * Renders multiple skeleton placeholders to simulate a list of networks being loaded
 * @returns {JSX.Element} Collection of network skeleton items arranged in rows
 */
function LoadingNetworksSkeleton() {
  return (
    <>
      <Row first>
        <LoadingNetworkSkeleton />
      </Row>
      <Row>
        <LoadingNetworkSkeleton />
      </Row>
      <Row>
        <LoadingNetworkSkeleton />
      </Row>
      <Row>
        <LoadingNetworkSkeleton />
      </Row>
      <Row>
        <LoadingNetworkSkeleton />
      </Row>
      <Row>
        <LoadingNetworkSkeleton />
      </Row>
      <Row>
        <LoadingNetworkSkeleton />
      </Row>
    </>
  );
}

export default LoadingNetworksSkeleton;
