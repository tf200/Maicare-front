import { NewMedicationReqDto } from "@/types/medications/new-medication-req-dto";

export type MedicationFormType = Omit<NewMedicationReqDto, "client">;
