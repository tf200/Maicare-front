import { ClientsListResDto } from "@/types/clients/clients-list-res-dto";
import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchClients =
  (page = 1) =>
  async () => {
    const res = await api.get<ClientsListResDto>(`client/client_list/`, {
      params: {
        page,
      },
    });
    return res.data;
  };

export const useClientsList = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["clients", page],
    queryFn: fetchClients(page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
