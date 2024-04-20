import dayjs from "dayjs";

export function monthsBetween(date1: Date, date2: Date) {
  const months = dayjs(date2).diff(date1, "month", false);
  const remainingDays = dayjs(date1).add(months, "month").diff(date2, "day");
  return { months, remainingDays };
}
