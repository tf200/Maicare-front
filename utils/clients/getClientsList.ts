import { ClientsListResDto } from "@/types/clients/clients-list-res-dto";
import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";

const fetchClients =
  (params?: ClientsSearchParams, page = 1) =>
  async () => {
    const res = await api.get<ClientsListResDto>(`client/client_list/`, {
      params: {
        page,
        ...params,
      },
    });
    return res.data;
  };

export const useClientsList = (params?: ClientsSearchParams) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["clients", { page, ...params }],
    queryFn: fetchClients(params, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
