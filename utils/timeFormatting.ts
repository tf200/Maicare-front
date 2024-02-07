import dayjs from "dayjs";

export const DATE_FORMAT = "DD MMM YYYY";

export function dateFormat(date: string | Date) {
  return dayjs(date).format(DATE_FORMAT);
}

export const SHORT_DATE_FORMAT = "D/M/YY";

export function shortDateFormat(date: string | Date) {
  return dayjs(date).format(SHORT_DATE_FORMAT);
}

export const FULL_DATE_FORMAT = "dddd DD MMMM YYYY";
export function fullDateFormat(date: string | Date) {
  return dayjs(date).format(FULL_DATE_FORMAT);
}
