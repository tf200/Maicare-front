import dayjs from "dayjs";
import { date } from "yup";

export function getAge(dateOfBirth: string | Date) {
  return dayjs().diff(dayjs(dateOfBirth), "year");
}
