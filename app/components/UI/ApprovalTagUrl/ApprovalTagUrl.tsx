import React, { useEffect, useMemo, useState } from 'react';

import { strings } from '../../../../locales/i18n';
import TagUrl from '../../../component-library/components/Tags/TagUrl';
import { useStyles } from '../../../component-library/hooks';
import AppConstants from '../../../core/AppConstants';
import { getHost, prefixUrlWithProtocol } from '../../../util/browser';
import useFavicon from '../../hooks/useFavicon/useFavicon';
import stylesheet from './ApprovalTagUrl.styles';
import { INTERNAL_ORIGINS } from '../../../constants/transaction';

const { ORIGIN_DEEPLINK, ORIGIN_QR_CODE } = AppConstants.DEEPLINKS;
/**
 * Test ID constant for the approval tag URL origin pill component
 */
export const APPROVAL_TAG_URL_ORIGIN_PILL = 'APPROVAL_TAG_URL_ORIGIN_PILL';

interface ApprovalTagUrlProps {
  currentEnsName?: string;
  origin?: string;
  sdkDappMetadata?: {
    url: string;
    icon: string;
  };
  url: string;
}

/**
 * ApprovalTagUrl component displays a URL tag for approval requests
 * Shows the origin domain with favicon for dapp approval flows
 * Handles various URL sources including ENS names, deep links, and SDK metadata
 * @param {ApprovalTagUrlProps} props - Component props
 * @param {string} props.origin - The origin URL of the requesting dapp
 * @param {string} props.url - The full URL of the request
 * @param {Object} props.sdkDappMetadata - SDK metadata containing URL and icon
 * @param {string} props.currentEnsName - ENS name if available
 * @returns {JSX.Element|null} The rendered URL tag component or null if no origin to show
 */
const ApprovalTagUrl = ({
  origin,
  url,
  sdkDappMetadata,
  currentEnsName,
}: ApprovalTagUrlProps) => {
  const { styles } = useStyles(stylesheet, {});
  const [isOriginDeepLink, setIsOriginDeepLink] = useState(false);

  useEffect(() => {
    const isOriginDeepLinkVal =
      origin === ORIGIN_DEEPLINK || origin === ORIGIN_QR_CODE;

    setIsOriginDeepLink(isOriginDeepLinkVal);
  }, [origin]);

  const domainTitle = useMemo(() => {
    let title = '';

    if (currentEnsName) {
      title = prefixUrlWithProtocol(currentEnsName);
    } else if (origin && isOriginDeepLink) {
      title = prefixUrlWithProtocol(origin);
    } else if (url) {
      title = prefixUrlWithProtocol(getHost(url));
    } else if (origin) {
      title = prefixUrlWithProtocol(getHost(origin));
    } else {
      title = '';
    }

    return title;
  }, [currentEnsName, origin, url, isOriginDeepLink]);

  const faviconSource = useFavicon(origin as string) as
    | { uri: string }
    | undefined;

  const imageSource = faviconSource?.uri
    ? faviconSource
    : sdkDappMetadata?.icon
    ? { uri: sdkDappMetadata.icon }
    : {
        uri: '',
      };

  const showOrigin =
    origin && !isOriginDeepLink && !INTERNAL_ORIGINS.includes(origin);

  if (showOrigin) {
    return (
      <TagUrl
        testID={APPROVAL_TAG_URL_ORIGIN_PILL}
        imageSource={imageSource}
        label={domainTitle || sdkDappMetadata?.url || strings('sdk.unknown')}
        style={styles.tagUrl}
      />
    );
  }
  return null;
};

export default ApprovalTagUrl;
