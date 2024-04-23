import { NewAppointmentReqDto } from "@/types/appointments/appointment-req-dto";

export type AttachmentItem = {
  id: string;
  name: string;
  file: string;
  attachment?: string; // like file field due to inconsistent backend
  attachement?: string; // typo in the backend
  tag?: string;
};

export type AppointmentResDto = Omit<
  NewAppointmentReqDto,
  "temporary_file_ids"
> & {
  id: number;
  attachments: AttachmentItem[];
};
