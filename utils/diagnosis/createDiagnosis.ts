import { NewDiagnosisReqDto } from "@/types/diagnosis/new-diagnosis-req-dto";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { DiagnosisResDto } from "@/types/diagnosis/diagnosis-res-dto";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { DiagnosisFormType } from "@/components/forms/DiagnosisForm";

export async function createDiagnosis(data: NewDiagnosisReqDto) {
  const response = await api.post("/client/diagnosis_create/", data);
  return response.data;
}

export const useCreateDiagnosis = (
  client: number,
  diagnosing_clinician: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DiagnosisFormType) => {
      return createDiagnosis({
        ...data,
        client,
        severity: data.severity as DiagnosisSeverity,
        diagnosing_clinician,
      });
    },
    onSuccess: (data: DiagnosisResDto) => {
      queryClient.invalidateQueries([
        "diagnosis",
        {
          client,
        },
      ]);
    },
  });
};
