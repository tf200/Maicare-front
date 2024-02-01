import api from "@/utils/api";
import { DiagnosisListResDto } from "@/types/diagnosis/diagnosis-list-res-dto";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchDiagnosis =
  (clientId: string, page = 1) =>
  async () => {
    const response = await api.get<DiagnosisListResDto>(
      `client/diagnosis_list/${clientId}/`,
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  };

export const useDiagnosisList = (clientId: string) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [clientId, "diagnosis", page],
    queryFn: fetchDiagnosis(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
