import { NewMedicationReqDto } from "@/types/medications/new-medication-req-dto";

export type MedicationsResDto = NewMedicationReqDto & {
  id: number;
  unset_medications: number;
  administered_by_id: number;
  administered_by_name: string;
};
