import { NewMedicationReqDto } from "@/types/medications/new-medication-req-dto";

export type MedicationsResDto = NewMedicationReqDto & {
  id: number;
  unset_medications: number;
};
