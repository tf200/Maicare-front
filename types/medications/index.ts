export type MedicationRecordItem = [
  {
    client_medication_id: number;
    status: "taken" | "not_taken" | "awaiting";
    reason: string;
    time: string;
    created: string;
  },
];
