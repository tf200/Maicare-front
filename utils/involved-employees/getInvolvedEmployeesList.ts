import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchInvolvedEmployeesList =
  (clientId: string, page = 1) =>
  async () => {
    const response = await api.get(
      `employee/clientassignment_list/${clientId}/`,
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  };

export const useInvolvedEmployeesList = (clientId: string) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [clientId, "employees", page],
    queryFn: fetchInvolvedEmployeesList(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
