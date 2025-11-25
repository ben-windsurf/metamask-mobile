import { strings } from '../../../locales/i18n';
import { MINUTE, HOUR, DAY } from '../../constants/time';

/**
 * Time difference result object
 */
interface TimeDifference {
  days: number;
  hours: number;
  minutes: number;
}

/**
 * Converts a timestamp to a locale-formatted date and time string.
 *
 * @param timestamp - The timestamp to convert (milliseconds since epoch or Date-compatible value)
 * @returns A string containing the locale-formatted date and time separated by a space
 */
export function toLocaleDateTime(timestamp: number | string | Date): string {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return `${date} ${time}`;
}

/**
 * Formats a given timestamp into a human-readable date format.
 * The format is: "Month Day at HH:MM am/pm"
 *
 * @param timestamp - The timestamp to format (milliseconds since epoch or Date object)
 * @returns A formatted string like "January 15 at 3:30 pm"
 */
export function toDateFormat(timestamp: number | Date): string {
  const date = new Date(timestamp);
  const month = strings(`date.months.${date.getMonth()}`);
  const day = date.getDate();
  let hours = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${month} ${day} ${strings('date.connector')} ${hours}:${minutes} ${ampm}`;
}

/**
 * Converts a timestamp to a locale-formatted date string.
 *
 * @param timestamp - The timestamp to convert (milliseconds since epoch or Date-compatible value)
 * @returns A locale-formatted date string
 */
export function toLocaleDate(timestamp: number | string | Date): string {
  return new Date(timestamp).toLocaleDateString();
}

/**
 * Converts a timestamp to a locale-formatted time string.
 *
 * @param timestamp - The timestamp to convert (milliseconds since epoch or Date-compatible value)
 * @returns A locale-formatted time string
 */
export function toLocaleTime(timestamp: number | string | Date): string {
  return new Date(timestamp).toLocaleTimeString();
}

/**
 * Calculates the difference in milliseconds between a given date and today.
 *
 * @param date - The Date object to compare with today
 * @returns The absolute difference in milliseconds between the two dates
 */
export function msBetweenDates(date: Date): number {
  const today = new Date();
  return Math.abs(date.getTime() - today.getTime());
}

/**
 * Converts milliseconds to hours.
 *
 * @param milliseconds - The number of milliseconds to convert
 * @returns The equivalent number of hours
 */
export function msToHours(milliseconds: number): number {
  return milliseconds / (60 * 60 * 1000);
}

/**
 * Converts a timestamp to the 'yyyy-MM-dd' format.
 *
 * @param timestamp - The timestamp to convert (milliseconds since epoch)
 * @returns A formatted date string in 'yyyy-MM-dd' format
 */
export const formatTimestampToYYYYMMDD = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns an object containing the difference in days, hours, and minutes between now and a future timestamp.
 *
 * @param timestamp - The timestamp in the future to compare to now (milliseconds since epoch)
 * @returns Object with difference in amount of days, hours, and minutes.
 *          If timestamp is in the past, returns { days: 0, hours: 0, minutes: 0 }
 */
export const getTimeDifferenceFromNow = (timestamp: number): TimeDifference => {
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
