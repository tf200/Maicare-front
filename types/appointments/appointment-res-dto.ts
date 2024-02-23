import { NewAppointmentReqDto } from "@/types/appointments/appointment-req-dto";

export type AttachmentItem = {
  id: string;
  file: string;
  name: string;
};

export type AppointmentResDto = Omit<
  NewAppointmentReqDto,
  "temporary_file_ids"
> & {
  id: number;
  attachments: AttachmentItem[];
};
