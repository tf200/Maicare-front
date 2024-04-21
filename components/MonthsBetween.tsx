import React, { FunctionComponent, useMemo } from "react";
import { monthsBetween } from "@/utils/monthsBetween";
import dayjs from "dayjs";

const MonthsBetween: FunctionComponent<{
  startDate: string;
  endDate: string;
}> = ({ startDate, endDate }) => {
  const { months, remainingDays } = useMemo(
    () => monthsBetween(dayjs(startDate).toDate(), dayjs(endDate).toDate()),
    [startDate, endDate]
  );
  return (
    <>
      {months > 0 ? `${months} maanden` : ""}{" "}
      {remainingDays > 0 ? ` ${remainingDays} dagen` : ""}
    </>
  );
};

export default MonthsBetween;
