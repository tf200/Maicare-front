import { NewClientsRequest } from "@/types/clients/new-clients-request";

export type ClientDetailsResDto = NewClientsRequest & {
  id: number;
  profile_picture: string;
  identity: boolean;
  sender: number;
  status: "On Waiting List" | "In Care" | "Out Of Concern";
};
