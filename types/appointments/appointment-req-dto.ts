import { AppointmentFormType } from "@/types/appointments/appointment-form-type";

export type NewAppointmentReqDto = Omit<
  AppointmentFormType,
  "employees" | "clients"
> & {
  employees: number[];
  clients: number[];
};
