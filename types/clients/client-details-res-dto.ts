import { NewClientsRequest } from "@/types/clients/new-clients-request";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";

export type ClientDetailsResDto = NewClientsRequest & {
  id: number;
  profile_picture: string;
  identity: boolean;
  sender: number;
  status: "On Waiting List" | "In Care" | "Out Of Care";
  attachments: AttachmentItem[];
};
