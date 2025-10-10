/**
 * Utility class for date formatting and timezone calculations.
 */
export class DateUtils {

  /**
   * Formats a Date object into a string with pattern `YYYY-MM-DDTHH:mm:ss±HHMM`.
   * Example: `2025-10-09T14:47:19+0300`.
   *
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date-time string including the numeric timezone offset.
   */
  static getFormattedDateTime(date) {
    const pad = (number) => String(number).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${DateUtils.getTimezoneOffsetString(date)}`;
  }

  /**
   * Returns the numeric timezone offset of a Date object in `±HHMM` format.
   * Example: `+0300` for UTC+3.
   *
   * @param {Date} date - The date from which to get the timezone offset.
   * @returns {string} The numeric timezone offset string.
   */
  static getTimezoneOffsetString(date) {
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
    const offsetMins = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
    return `${sign}${offsetHours}${offsetMins}`;
  }
}
