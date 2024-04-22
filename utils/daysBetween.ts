import dayjs from "dayjs";

export function daysBetween(daysStart: Date, daysEnd: Date) {
  const diff = dayjs(daysEnd).diff(daysStart, "day");
  return Array.from({
    length: diff + 1,
  }).map((_, i) => dayjs(daysStart).add(i, "day").toDate());
}
