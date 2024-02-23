import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { AppointmentType } from "@/types/appointments/appointment-type";

export type AppointmentListItem = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  appointment_type: AppointmentType;
  description: string;
  temporary_file_ids: string[];
  employees: number[];
  clients: number[];
};

export type AppointmentListResDto = AppointmentListItem[];
