import { DiagnosisResDto } from "@/types/diagnosis/diagnosis-res-dto";

export type DiagnosisListItem = DiagnosisResDto;

export type DiagnosisListResDto = Paginated<DiagnosisListItem>;
