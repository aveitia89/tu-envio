
export const MAX_ELEMENTS_FOR_REPORTS = 999999;

export function parseDTO(filter: any) {
  const where = {};
  Object.keys(filter).forEach(key => {
      where[key] = filter[key];
  });
  return where;
}

/**
 * Return the current date with format yyyymmdd
 *
 */
export function getDate(currentDate: Date): string {
  const day = currentDate.getDay();
  const month = currentDate.getMonth() + 1;
  const YEAR = currentDate.getFullYear();
  const MONTH = (month < 10) ? `0${month}` : month;
  const DAY = (day < 10) ? `0${day}` : day;
  const HOURS = currentDate.getHours();
  const MINUTES = currentDate.getMinutes();
  const SECONDS = currentDate.getSeconds();
  const builderDate = `${DAY}/${MONTH}/${YEAR} ${HOURS}:${MINUTES}:${SECONDS}`;
  return builderDate;
}

/**
 * Calculate the amount of days passed since 1970 until the given date.
 *
 * @param year
 * @param month
 * @param day
 */
function calculateDays(date: Date) {
  let year: number = date.getFullYear();
  let month: number = date.getMonth();
  const day: number = date.getDate();
  month = (month + 9) % 12; year -= month / 10;
  return 365 * year + year / 4 - year / 100 + year / 400 + (month * 306 + 5) / 10 + (day - 1);
}

/**
 * Calculate the difference of days between two dates.
 *
 * @param date1
 * @param date2
 */
function differenceDates(date1: Date, date2: Date) {
  return calculateDays(date2) - calculateDays(date1);
}

/**
 * Check if the data has been delete 5 years ago in order to deleted permanently.
 *
 * @param date
 */
export function canDelete(date: Date) {
  const DATA_LIVE_TIME: number = 1826;  // 5 years = 1826 days
  const elapsedTime = differenceDates(date, new Date());
  if (elapsedTime > DATA_LIVE_TIME) {
    return true;
  }
  return false;
}
