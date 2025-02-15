export type NewMedicationReqDto = {
  name: string;
  dosage: string;
  start_date: string;
  end_date: string;
  self_administered: boolean;
  slots: DateTimes;
  notes: string;
  client: number;
  administered_by: number | null;
  is_critical: boolean;
};
