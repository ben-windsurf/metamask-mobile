import { strings } from '../../../../../../../../../locales/i18n';

/**
 * Renders the unstaking time remaining message with flexible countdown display
 * Formats the message based on remaining time components and ETH amount
 * @param {Object} timeRemaining - Time remaining object
 * @param {number} timeRemaining.days - Number of days remaining
 * @param {number} timeRemaining.hours - Number of hours remaining
 * @param {number} timeRemaining.minutes - Number of minutes remaining
 * @param {string} amountEth - Amount of ETH being unstaked
 * @returns {string} Formatted unstaking time remaining message
 */
export const renderUnstakingTimeRemaining = (
  { days, hours, minutes }: { days: number; hours: number; minutes: number },
  amountEth: string,
) => {
  if (!days && !hours && !minutes)
    return strings('stake.banner_text.unstaking_in_progress.default', {
      amountEth,
    });

  const baseCopy = strings('stake.banner_text.unstaking_in_progress.base', {
    amountEth,
  });

  const minuteString = minutes
    ? `${strings('stake.banner_text.approximately')} ${minutes} ${strings(
        'stake.minute',
        {
          count: minutes,
        },
      )}`
    : '';

  const dayString = days
    ? `${days} ${strings('stake.day', { count: days })}`
    : '';

  const hourString = hours
    ? `${hours} ${strings('stake.hour', { count: hours })}`
    : '';

  const andString =
    days && hours
      ? ` ${strings('stake.banner_text.unstaking_in_progress.and')} `
      : '';

  const toClaimString = strings(
    'stake.banner_text.unstaking_in_progress.to_claim_it',
  );

  if (!days && !hours && minutes) {
    return `${baseCopy} ${minuteString} ${toClaimString}`.trim();
  }

  return `${baseCopy} ${dayString}${andString}${hourString} ${toClaimString}`.trim();
};
