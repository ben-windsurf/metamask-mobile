import React from 'react';
import Banner, {
  BannerAlertSeverity,
  BannerVariant,
} from '../../../../../../../component-library/components/Banners/Banner';
import Text from '../../../../../../../component-library/components/Texts/Text';
import { renderUnstakingTimeRemaining } from './utils';
import { BannerProps } from '../../../../../../../component-library/components/Banners/Banner/Banner.types';

export type UnstakingBannerProps = Pick<BannerProps, 'style'> & {
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
  };
  amountEth: string;
};

/**
 * UnstakingBanner component displays information about ongoing unstaking process
 * Shows the remaining time and amount for an unstaking operation in an info banner
 * @param {UnstakingBannerProps} props - Component props
 * @param {Object} props.timeRemaining - Time remaining for unstaking completion
 * @param {number} props.timeRemaining.days - Days remaining
 * @param {number} props.timeRemaining.hours - Hours remaining
 * @param {number} props.timeRemaining.minutes - Minutes remaining
 * @param {string} props.amountEth - Amount of ETH being unstaked
 * @param {Object} props.style - Optional style overrides for the banner
 * @returns {JSX.Element} Banner component displaying unstaking information
 */
const UnstakingBanner = ({
  timeRemaining,
  amountEth,
  style,
}: UnstakingBannerProps) => (
  <Banner
    severity={BannerAlertSeverity.Info}
    variant={BannerVariant.Alert}
    style={style}
    description={
      <Text testID="unstaking-banner">
        {renderUnstakingTimeRemaining(timeRemaining, amountEth)}
      </Text>
    }
  />
);

export default UnstakingBanner;
