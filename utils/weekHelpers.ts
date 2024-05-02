import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export function weekNumberRange(reference: string | Date, distance: number) {
  return {
    start: dayjs(reference).add(distance, "week").startOf("week").toDate(),
    end: dayjs(reference).add(distance, "week").endOf("week").toDate(),
  };
}

export function maxWeekNumber(reference: string | Date) {
  let week = 0;
  do {
    const { start, end } = weekNumberRange(reference, week);
    const isWithin = dayjs().isBetween(start, end);
    const isAfter = dayjs().isAfter(end);
    if (isWithin) {
      return week;
    }
    if (isAfter) {
      week++;
    } else {
      return week;
    }
  } while (true);
}
