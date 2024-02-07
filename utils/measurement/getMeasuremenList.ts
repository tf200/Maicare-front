import api from "@/utils/api";
import { useQuery } from "react-query";
import { useState } from "react";
import { MeasurmentListResDto } from "@/types/measurment/measurment-list-res-dto";

async function getMeasurementList(clientId: number, page = 1) {
  const res = await api.get<MeasurmentListResDto>(
    `employee/measurment_list/${clientId}`,
    {
      params: {
        page,
      },
    }
  );
  return res.data;
}

export const useMeasurementList = (clientId: number) => {
  const [page, setPage] = useState(1);

  const query = useQuery<MeasurmentListResDto>({
    queryKey: [clientId, "measurment", page],
    queryFn: () => getMeasurementList(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
