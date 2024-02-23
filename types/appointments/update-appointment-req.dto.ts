import { NewAppointmentReqDto } from "@/types/appointments/appointment-req-dto";

export type UpdateAppointmentReqDto = Partial<
  NewAppointmentReqDto & {
    attachment_ids_to_delete: string[];
  }
> & {
  id: number;
};
