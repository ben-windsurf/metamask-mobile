// @ts-expect-error - humanize-duration is not typed
import humanizeDuration from 'humanize-duration';

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      m: () => 'min',
      s: () => 'sec',
    },
  },
});

const withoutUnitHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      m: () => '',
      s: () => '',
    },
  },
});

/**
 * Converts a time range in milliseconds to a human-readable estimated time range
 * Used in transaction confirmations to display estimated completion times
 * @param {number} min - Minimum time in milliseconds
 * @param {number} max - Maximum time in milliseconds
 * @returns {string | undefined} Human-readable time range (e.g., "1- 2 min") or undefined if invalid inputs
 */
export const toHumanEstimatedTimeRange = (min: number, max: number) => {
  if (!min || !max) {
    return undefined;
  }

  // Determine if we should show in minutes or seconds
  const minInSeconds = min / 1000;
  const maxInSeconds = max / 1000;
  const useMinutes = maxInSeconds >= 60;

  const options = {
    units: useMinutes ? ['m'] : ['s'],
    round: false,
    spacer: ' ',
    decimal: '.',
    maxDecimalPoints: 1,
  };

  // Handle edge case for values close to a minute
  const adjustedMin =
    useMinutes && minInSeconds >= 59 && minInSeconds < 60 ? 60000 : min;

  return (
    withoutUnitHumanizer(adjustedMin, options) +
    '- ' +
    shortEnglishHumanizer(max, options)
  );
};

/**
 * Converts milliseconds to a human-readable seconds format
 * Used in transaction confirmations to display time durations in seconds
 * @param {number} milliseconds - Time duration in milliseconds
 * @returns {string} Human-readable time in seconds format (e.g., "30 sec")
 */
export const toHumanSeconds = (milliseconds: number): string => {
  const options = {
    units: ['s'],
    round: false,
    spacer: ' ',
    decimal: '.',
    maxDecimalPoints: 0,
  };

  return shortEnglishHumanizer(milliseconds, options);
};
