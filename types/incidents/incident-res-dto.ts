import { NewIncidentReqDto } from "@/types/incidents/new-incident-req-dto";

export type IncidentsResDto = {
  id: number;
  created: string;
} & NewIncidentReqDto;
