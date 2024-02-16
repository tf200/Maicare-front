"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import {
  Calendar,
  dayjsLocalizer,
  Formats,
  View,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import "dayjs/locale/nl";
import Panel from "@/components/Panel";
import Toolbar from "@/components/calendarComponents/Toolbar";
dayjs.locale("nl");
const localizer = dayjsLocalizer(dayjs);

const Page: FunctionComponent = (props) => {
  const formats: Formats = {
    dayFormat: "D",
    weekdayFormat: (date, culture, dateLocalizer) =>
      dateLocalizer.format(date, "dddd", culture),
  };
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);

  return (
    <Panel title={"Kalender"} containerClassName="px-7 py-4">
      <Calendar
        localizer={localizer}
        events={[
          {
            title: "Important meeting",
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
          },
        ]}
        formats={formats}
        onView={onView}
        view={view}
        onNavigate={onNavigate}
        date={date}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        style={{
          height: "calc(100vh - 250px)",
        }}
        components={{
          toolbar: Toolbar,
        }}
      />
    </Panel>
  );
};

export default Page;
