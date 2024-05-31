import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchConsentDeclaration = (ConstId: number) => async () => {
  const response = await api.get(`/clients/questionnairs/consent-declarations/${ConstId}/details
  `);
  return response.data;
};

export const useGetSingleConsentDeclaration = (ConstId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "consent-declaration", ConstId],
    queryFn: fetchConsentDeclaration(ConstId),
    keepPreviousData: true,
    enabled: !!ConstId,
  });

  return {
    ...query,
  };
};
