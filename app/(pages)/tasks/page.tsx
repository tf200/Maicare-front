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
  SlotInfo,
  View,
  Views,
} from "react-big-calendar";

import "./calendar-styles.scss";
import Panel from "@/components/Panel";
import Toolbar from "@/components/calendarComponents/Toolbar";
import AppointmentFormModal from "@/components/Modals/AppointmentFormModal";
import { useModal } from "@/components/providers/ModalProvider";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { useAppointmentsList } from "@/utils/appointments/listAppointments";

import dayjs from "dayjs";
import "dayjs/locale/nl";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useQueryClient } from "react-query";
import { AppointmentListResDto } from "@/types/appointments/appointments-res.dto";
import { useUpdateAppointment } from "@/utils/appointments/updateAppointment";
dayjs.locale("nl");
const localizer = dayjsLocalizer(dayjs);

type CalendarEvent = AppointmentResDto & {
  start: Date;
  end: Date;
};

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
  const queryClient = useQueryClient();

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const { open } = useModal(AppointmentFormModal);
  const { mutate: updateAppointment } = useUpdateAppointment();
  const { data, isLoading } = useAppointmentsList();
  const events = useMemo<CalendarEvent[]>(() => {
    if (!data) return [];
    return data.map((appointment) => {
      return {
        ...appointment,
        start: dayjs(appointment.start_time).toDate(),
        end: dayjs(appointment.end_time).toDate(),
      };
    });
  }, [data]);
  const showUpdateModal = useCallback(
    (event: CalendarEvent) => {
      const initialData = { ...event };
      delete initialData.start;
      delete initialData.end;
      const close = open({
        onSuccess: () => {
          close();
        },
        initialData,
        mode: "edit",
      });
    },
    [open]
  );

  const showCreateModal = useCallback(
    (slot: SlotInfo) => {
      const close = open({
        onSuccess: () => {
          close();
        },
        initialData: {
          start_time: dayjs(slot.start).format("YYYY-MM-DDTHH:mm"),
          end_time: dayjs(slot.end).format("YYYY-MM-DDTHH:mm"),
        },
      });
    },
    [open]
  );

  const updateEventTime = useCallback(
    (interaction: EventInteractionArgs<CalendarEvent>) => {
      queryClient.setQueryData<AppointmentListResDto>(
        ["appointments"],
        (data) => {
          return data.map((appointment) => {
            if (appointment.id === interaction.event.id) {
              const newAppointment = {
                ...appointment,
                start_time: dayjs(interaction.start).format("YYYY-MM-DDTHH:mm"),
                end_time: dayjs(interaction.end).format("YYYY-MM-DDTHH:mm"),
              };
              updateAppointment(newAppointment);
              return newAppointment;
            }
            return appointment;
          });
        }
      );
      queryClient.setQueryDefaults(["appointments"], { enabled: true });
    },
    [queryClient]
  );

  const deactivateQuery = useCallback(() => {
    queryClient.setQueryDefaults(["appointments"], { enabled: false });
  }, [queryClient]);

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
        onSelectSlot={showCreateModal}
        onSelectEvent={showUpdateModal}
        selectable
        resizable
        style={{
          height: "calc(100vh - 250px)",
        }}
        components={{
          toolbar: Toolbar,
        }}
        handleDragStart={deactivateQuery}
        onEventDrop={updateEventTime}
        onEventResize={updateEventTime}
      />
    </Panel>
  );
};

export default Page;
