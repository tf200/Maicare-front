import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AutomaticReportsReqDto } from "@/types/automatic-reports";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { cleanQueryParams } from "@/utils/cleanQueryParams";

async function getAutomaticReports(clientId: number, params: PaginationParams) {
  const response = await api.get<Paginated<any>>(`/ai/generated_summaries/${clientId}`, {
    params: cleanQueryParams(params),
  });
  return response.data;
}

export const useAutomaticReports = (clientId: number) => {
  const pagination = usePaginationParams();
  const query = useQuery(
    ["automaticReports", clientId, pagination.params],
    () => getAutomaticReports(clientId, pagination.params),
    {
      keepPreviousData: true,
    }
  );
  return {
    ...query,
    pagination,
  };
};

async function generateAutomaticReports(data: AutomaticReportsReqDto) {
  await api.post(`/ai/generate_report_summary/${data.client_id}/${data.from}/${data.to}`);
}

export const useGenerateAutomaticReports = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation(generateAutomaticReports, {
    onSuccess: () => {
      queryClient.invalidateQueries(["automaticReports", clientId]);
    },
  });
};
