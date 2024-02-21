"use client";

import React, {
  FunctionComponent,
  useCallback,
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
import AppointmentFormModal from "@/components/Modals/AppointmentFormModal";
import { useModal } from "@/components/providers/ModalProvider";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useAppointmentsList } from "@/utils/appointments/listAppointments";

import dayjs from "dayjs";
import "dayjs/locale/nl";
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
  const [view, setView] = useState<View>(Views.WEEK);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const { open } = useModal(AppointmentFormModal);
  const { data, isLoading } = useAppointmentsList();
  const events = useMemo(() => {
    if (!data) return [];
    return data.map((appointment) => {
      console.log(appointment.start_time.slice(0, -4));
      console.log(appointment.end_time.slice(0, -4));
      return {
        id: appointment.id,
        title: appointment.title,
        start: dayjs(appointment.start_time).toDate(),
        end: dayjs(appointment.end_time).toDate(),
      };
    });
  }, [data]);
  return (
    <Panel title={"Kalender"} containerClassName="px-7 py-4">
      <DnDCalendar
        localizer={localizer}
        events={events}
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
        onSelectSlot={(slotInfo) => {
          const close = open({
            onSuccess: () => {
              close();
            },
            start: dayjs(slotInfo.start).format("YYYY-MM-DDTHH:mm"),
            end: dayjs(slotInfo.end).format("YYYY-MM-DDTHH:mm"),
          });
        }}
        selectable
        resizable
      />
    </Panel>
  );
};

export default Page;
