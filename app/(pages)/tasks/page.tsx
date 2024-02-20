"use client";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Calendar,
  dayjsLocalizer,
  Formats,
  View,
  Views,
} from "react-big-calendar";

import "./calendar-styles.scss";
import Panel from "@/components/Panel";
import Toolbar from "@/components/calendarComponents/Toolbar";

import dayjs from "dayjs";
import "dayjs/locale/nl";
import AppointmentFormModal from "@/components/Modals/AppointmentFormModal";
import { useModal } from "@/components/providers/ModalProvider";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
dayjs.locale("nl");
const localizer = dayjsLocalizer(dayjs);

const DnDCalendar = withDragAndDrop(Calendar);

const Page: FunctionComponent = (props) => {
  const formats: Formats = useMemo(
    () => ({
      dayFormat: "D",
      weekdayFormat: (date, culture, dateLocalizer) =>
        dateLocalizer.format(date, "dddd", culture),
    }),
    []
  );
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const { open, close } = useModal(AppointmentFormModal);
  useEffect(() => {
    open({
      onConfirm: () => {},
    });
    return close;
  }, []);
  return (
    <Panel title={"Kalender"} containerClassName="px-7 py-4">
      <DnDCalendar
        localizer={localizer}
        events={[
          {
            title: "Important meeting",
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
          },
          {
            title: "Parallel Important meeting",
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 2)),
          },
          {
            title: "Parallel Important meeting #2",
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 3)),
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
