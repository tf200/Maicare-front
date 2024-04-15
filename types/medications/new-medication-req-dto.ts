export type NewMedicationReqDto = {
  name: string;
  dosage: string;
  start_date: string;
  end_date: string;
  self_administered: boolean;
  days: string[];
  times: string[];
  notes: string;
  client: number;
};
