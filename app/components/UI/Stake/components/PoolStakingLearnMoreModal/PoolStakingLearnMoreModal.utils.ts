import { VaultApyAverages } from '@metamask/stake-sdk';
import { strings } from '../../../../../../locales/i18n';

/**
 * Parses vault APY averages response data into a structured format with time periods
 * Converts the vault timespan APRs into a map organized by number of days with labels
 * @param {VaultApyAverages} vaultTimespanAprs - The vault APY averages data from the API
 * @returns {Record<number, {apyAverage: string, numDays: number, label: string}>} Map of days to APY data with localized labels
 */
export const parseVaultApyAveragesResponse = (
  vaultTimespanAprs: VaultApyAverages,
) => {
  const numDaysMap: Record<
    keyof VaultApyAverages,
    { numDays: number; label: string }
  > = {
    oneDay: { numDays: 1, label: strings('stake.today') },
    oneWeek: { numDays: 7, label: strings('stake.one_week_average') },
    oneMonth: { numDays: 30, label: strings('stake.one_month_average') },
    threeMonths: { numDays: 90, label: strings('stake.three_month_average') },
    sixMonths: { numDays: 180, label: strings('stake.six_month_average') },
    oneYear: { numDays: 365, label: strings('stake.one_year_average') },
  };

  return Object.entries(vaultTimespanAprs).reduce<
    Record<number, { apyAverage: string; numDays: number; label: string }>
  >((map, [key, value]) => {
    const numDaysMapEntry = numDaysMap[key as keyof typeof numDaysMap];
    map[numDaysMapEntry.numDays] = { apyAverage: value, ...numDaysMapEntry };
    return map;
  }, {});
};
