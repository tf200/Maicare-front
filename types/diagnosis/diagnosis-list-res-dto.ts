import { DiagnosisResDto } from "@/types/diagnosis/diagnosis-res-dto";

export type DiagnosisListItem = Omit<DiagnosisResDto, "client"> & {
  client: {
    // denormalized client data
    id: number;
    first_name: string;
    last_name: string;
  };
};

export type DiagnosisListResDto = Paginated<DiagnosisListItem>;
