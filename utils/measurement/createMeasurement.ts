import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewMeasurmentReqDto } from "@/types/measurment/new-measurment-req-dto";
import { MeasurementFormType } from "@/components/forms/MeasurementsForm";

async function createMeasurement(
  data: NewMeasurmentReqDto
): Promise<NewMeasurmentReqDto> {
  const res = await api.post<NewMeasurmentReqDto>(
    "employee/measurment_cl/",
    data
  );  
  return res.data;
}

export const useCreateMeasurement = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MeasurementFormType) => {
      return createMeasurement({
        ...data,
        client,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([client, "measurment"]);
    },
  });
};
