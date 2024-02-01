import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchEmergencyContacts =
  (clientId: string, page = 1) =>
  async () => {
    const response = await api.get(`client/emergency_list/${clientId}/`, {
      params: {
        page,
      },
    });
    return response.data;
  };

export const useEmergencyContactList = (clientId: string) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [clientId, "emergency", page],
    queryFn: fetchEmergencyContacts(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
