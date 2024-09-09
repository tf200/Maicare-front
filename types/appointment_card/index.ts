




type AppointmentCardItem = {
  content: string;
  is_dynamic?: boolean;
}


export type AppointmentCardDTO = {
  id: number;
  general: AppointmentCardItem[];
  important_contacts: AppointmentCardItem[];
  household: AppointmentCardItem[];
  organization_agreements: AppointmentCardItem[];
  probation_service_agreements: AppointmentCardItem[];
  appointments_regarding_treatment: AppointmentCardItem[];
  school_stage: AppointmentCardItem[];
  travel: AppointmentCardItem[];
  leave: AppointmentCardItem[];
  client: number;
  updated: string;

}