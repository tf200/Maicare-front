import { AppointmentType } from "@/types/appointments/appointment-type";

export type AppointmentFormType = {
  title: string;
  start_time: string;
  end_time: string;
  appointment_type: AppointmentType;
  description: string;
  temporary_file_ids: string[];
  employees: number[];
  clients: number[];
};
