import React from 'react';
import {
  UPSELL_BANNER_VARIANTS,
  UpsellBannerBodyProps,
  UpsellBannerProps,
  UpsellBannerHeaderProps,
} from './UpsellBanner.types';
import UpsellBannerBody from './UpsellBannerBody';
import UpsellBannerHeader from './UpsellBannerHeader';

/**
 * UpsellBanner component renders different banner variants for staking upsell
 * Displays either a header or body variant based on the provided variant prop
 * @param {UpsellBannerProps} props - Component props
 * @param {string} props.variant - Banner variant type (header or body)
 * @returns {JSX.Element} The rendered upsell banner component
 */
const UpsellBanner = ({
  variant = UPSELL_BANNER_VARIANTS.HEADER,
  ...props
}: UpsellBannerProps) => {
  switch (variant) {
    case UPSELL_BANNER_VARIANTS.BODY:
      return <UpsellBannerBody {...(props as UpsellBannerBodyProps)} />;
    case UPSELL_BANNER_VARIANTS.HEADER:
    default:
      return <UpsellBannerHeader {...(props as UpsellBannerHeaderProps)} />;
  }
};

export default UpsellBanner;
