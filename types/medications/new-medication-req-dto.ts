export type NewMedicationReqDto = {
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  notes: string;
  client: number;
  self_administered: boolean
};
