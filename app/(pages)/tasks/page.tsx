"use client";

import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import {
  Calendar,
  dayjsLocalizer,
  Formats,
  SlotInfo,
  ToolbarProps,
  View,
  Views,
} from "react-big-calendar";

import Panel from "@/components/Panel";
import Toolbar from "@/components/calendarComponents/Toolbar";
import AppointmentFormModal from "@/components/Modals/AppointmentFormModal";
import { useModal } from "@/components/providers/ModalProvider";
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { useAppointmentsList } from "@/utils/appointments/listAppointments";

import dayjs from "dayjs";
import "dayjs/locale/nl";
import { useQueryClient } from "react-query";
import {
  AppointmentListItem,
  AppointmentListResDto,
} from "@/types/appointments/appointments-res.dto";
import { useUpdateAppointment } from "@/utils/appointments/updateAppointment";
dayjs.locale("nl");
const localizer = dayjsLocalizer(dayjs);

import styles from "./calendar.module.scss";
import "./calendar.styles.scss";
import clsx from "clsx";
import { LocationSelect } from "@/components/FormFields/FormikLocation";
import { AppointmentSearchParams } from "@/types/appointments";

type CalendarEvent = AppointmentListItem & {
  start: Date;
  end: Date;
};

const DnDCalendar = withDragAndDrop(Calendar);

const Page: FunctionComponent = (props) => {
  const formats: Formats = useMemo(
    () => ({
      dayFormat: "D",
      weekdayFormat: (date, culture, dateLocalizer) => dateLocalizer.format(date, "dddd", culture),
    }),
    []
  );
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);
  const queryClient = useQueryClient();

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate]);
  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const { open } = useModal(AppointmentFormModal);
  const { mutate: updateAppointment } = useUpdateAppointment();
  const [filters, setFilter] = useState<AppointmentSearchParams>({});
  const { data, isLoading } = useAppointmentsList(filters);
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
        id: event.id,
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
        mode: "create",
        initialSlot: {
          start_time: dayjs(slot.start).format("YYYY-MM-DDTHH:mm"),
          end_time: dayjs(slot.end).format("YYYY-MM-DDTHH:mm"),
        },
      });
    },
    [open]
  );

  const updateEventTime = useCallback(
    (interaction: EventInteractionArgs<CalendarEvent>) => {
      queryClient.setQueryData<AppointmentListResDto>(["appointments", filters], (data) => {
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
      });
      queryClient.setQueryDefaults(["appointments"], { enabled: true });
    },
    [queryClient, filters]
  );

  const deactivateQuery = useCallback(() => {
    queryClient.setQueryDefaults(["appointments"], { enabled: false });
  }, [queryClient]);

  const classNameByAppointmentType = useCallback((event: CalendarEvent) => {
    return {
      className: clsx({
        [styles.meeting]: event.appointment_type === "meeting",
        [styles.other]: event.appointment_type === "other",
        [styles.work]: event.appointment_type === "work",
        [styles.home_care]: event.appointment_type === "home_care",
      }),
    };
  }, []);

  return (
    <Panel
      title={""}
      containerClassName="px-7 py-4"
      header={
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-bold">Kalender</h2>
          <LocationSelect
            value={filters.location}
            onChange={(e) =>
              setFilter(e.target.value != "" ? { location: Number(e.target.value) } : {})
            }
            className="min-w-75"
            label=""
          />
        </div>
      }
    >
      <div className="overflow-x-auto">
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
          className="min-w-[700px]"
          eventPropGetter={classNameByAppointmentType}
          handleDragStart={deactivateQuery}
          onEventDrop={updateEventTime}
          onEventResize={updateEventTime}
        />
      </div>
    </Panel>
  );
};

export default Page;
