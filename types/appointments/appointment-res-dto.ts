import { NewAppointmentReqDto } from "@/types/appointments/appointment-req-dto";

export type AppointmentResDto = NewAppointmentReqDto & {
  id: number;
};
