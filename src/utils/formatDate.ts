import { de } from 'date-fns/locale';
import { format } from 'date-fns-tz';

const timeZone = 'Europe/Berlin';

export function isDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

// TODO move the format date functions to the baseTheme!!!

/**
 * Converts an UTC Date string to the formatted date in  'Europe/Berlin' time zone
 * @param dateUtcStr
 * @param pattern date fns pattern.
 * @returns {string}
 */
export function formatDate(dateUtcStr: string, pattern = 'd. MMMM yyyy'): string {
  if (!isDate(dateUtcStr)) {
    return '';
  }
  const dateUtc = new Date(dateUtcStr);
  return format(dateUtc, pattern, { timeZone, locale: de });
}
