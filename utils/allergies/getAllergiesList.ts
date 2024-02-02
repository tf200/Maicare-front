import api from "@/utils/api";
import { AllergiesListResDto } from "@/types/allergies/allergies-list-res-dto";
import { useQuery } from "react-query";
import { useState } from "react";

async function getAllergiesList(clientId: number, page = 1) {
  const response = await api.get<AllergiesListResDto>(
    `client/allergy_list/${clientId}`,
    {
      params: {
        page,
      },
    }
  );
  return response.data;
}

export const useAllergiesList = (clientId: number) => {
  const [page, setPage] = useState(1);

  const query = useQuery<AllergiesListResDto>({
    queryKey: [clientId, "allergies", page],
    queryFn: () => getAllergiesList(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
