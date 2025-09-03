import { strings } from '../../../locales/i18n';
import { MINUTE, HOUR, DAY } from '../../constants/time';

/**
 * Converts a timestamp to a localized date and time string
 * @param {number | Date} timestamp - The timestamp to convert
 * @returns {string} Formatted date and time string in locale format
 */
export function toLocaleDateTime(timestamp) {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return `${date} ${time}`;
}

/**
 * Formats a timestamp to a localized date and time string with AM/PM format
 * @param {number | Date} timestamp - The timestamp to format
 * @returns {string} Formatted date and time string with month name and AM/PM time
 */
export function toDateFormat(timestamp) {
  const date = new Date(timestamp);
  const month = strings(`date.months.${date.getMonth()}`);
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${month} ${day} ${strings(
    'date.connector',
  )} ${hours}:${minutes} ${ampm}`;
}

/**
 * Converts a timestamp to a localized date string
 * @param {number | Date} timestamp - The timestamp to convert
 * @returns {string} Formatted date string in locale format
 */
export function toLocaleDate(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}

/**
 * Converts a timestamp to a localized time string
 * @param {number | Date} timestamp - The timestamp to convert
 * @returns {string} Formatted time string in locale format
 */
export function toLocaleTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString();
}

/**
 * Calculates the difference between today and a provided date in milliseconds
 * @param {Date} date - Date object to compare with today
 * @returns {number} The difference between the two dates in milliseconds
 */
export function msBetweenDates(date) {
  const today = new Date();
  return Math.abs(date.getTime() - today.getTime());
}

/**
 * Converts milliseconds to hours
 * @param {number} milliseconds - The number of milliseconds to convert
 * @returns {number} The equivalent number of hours
 */
export function msToHours(milliseconds) {
  return milliseconds / (60 * 60 * 1000);
}

/**
 * this function will convert a timestamp to the 'yyyy-MM-dd' format
 * @param {*} timestamp timestamp you wish to convert in milliseconds
 * @returns formatted date yyyy-MM-dd
 */
export const formatTimestampToYYYYMMDD = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns an object containing the difference in days, hours, and minutes between a now and a future timestamp.
 *
 * @param {number} timestamp - The timestamp in the future to compare to now.
 *
 * @returns object with difference in amount of days, hours, and minutes. If timestamp is in the past, a default value of { days: 0, hours: 0, minutes: 0 } is returned.
 */
export const getTimeDifferenceFromNow = (timestamp) => {
  const currentTime = Date.now();

  // Default when timestamp is in the past.
  if (timestamp < currentTime) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const differenceInMilliseconds = timestamp - currentTime;

  const days = Math.floor(differenceInMilliseconds / DAY);
  const hours = Math.floor((differenceInMilliseconds % DAY) / HOUR);
  const minutes = Math.floor((differenceInMilliseconds % HOUR) / MINUTE);

  return { days, hours, minutes };
};
