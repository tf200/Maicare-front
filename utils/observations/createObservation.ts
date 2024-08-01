import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewObservationsReqDto } from "@/types/observations/new-observations-req-dto";
import { ObservationsResDto } from "../../types/observations/observations-res-dto";
import { ObservationFormType } from "@/components/forms/ObservationForm";

async function createObservation(data: NewObservationsReqDto): Promise<ObservationsResDto> {
  const response = await api.post<ObservationsResDto>("employee/observations_cl/", data);

  return response.data;
}

export const useCreateObservation = (client: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ObservationFormType) => {
      return createObservation({
        ...data,
        client,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries([client, "observations"]);
    },
  });
};
