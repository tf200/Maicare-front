export type MedicationRecordStatus = "awaiting" | "not_taken" | "taken";

export type MedicationRecord = {
  id: number;
  client_medication_id: number;
  status: MedicationRecordStatus;
  reason: string;
  time: string;
  updated: string;
  created: string;
};

export type MedicationRecords = Paginated<MedicationRecord>;

export type PatchMedicationRecordDto = Pick<
  MedicationRecord,
  "status" | "reason"
>;

export type MedicationRecordParams = {
  created?: string;
  status?: MedicationRecordStatus;
};
