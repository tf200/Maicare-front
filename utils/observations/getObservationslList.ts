import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";
import { ObservationsResDto } from "../../types/observations/observations-res-dto";

async function fetchObservationsList(clientId: number, page = 1) {
  const response = await api.get<ObservationsResDto>(
    `employee/observations_list/${clientId}/`,
    {
      params: {
        page,
      },
    }
  );
  return response.data;
}

export const useObservationsList = (clientId: number) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryFn: () => fetchObservationsList(clientId, page),
    queryKey: [clientId, "observations", page],
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
