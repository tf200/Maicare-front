import api from "@/utils/api";
import { MedicationsListResDto } from "@/types/medications/medications-list-res-dto";
import { useState } from "react";
import { useQuery } from "react-query";

async function fetchMedicationsList(clientId: number, page = 1) {
  const response = await api.get<MedicationsListResDto>(
    `client/medication_list/${clientId}/`,
    {
      params: {
        page,
      },
    }
  );
  return response.data;
}

export const useMedicationsList = (clientId: number) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryFn: () => fetchMedicationsList(clientId, page),
    queryKey: [clientId, "medications", page],
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
