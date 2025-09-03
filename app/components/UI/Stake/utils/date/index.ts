/**
 * Gets the UTC week range (Monday to Sunday) for a given date
 * @param {Date | string} date - The date to get the week range for
 * @returns {Object} Object containing start and end dates of the week in YYYY-MM-DD format
 * @returns {string} returns.start - The start date of the week (Monday)
 * @returns {string} returns.end - The end date of the week (Sunday)
 */
export const getUTCWeekRange = (date: Date | string) => {
  const startDate = new Date(date);
  const dayOfWeek = startDate.getUTCDay();
  const startOfWeek = new Date(startDate);
  startOfWeek.setUTCDate(startDate.getUTCDate() - ((dayOfWeek + 6) % 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  // returns a formatted utc date yyyy-MM-dd
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};
