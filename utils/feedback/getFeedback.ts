import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchFeedback = (dataId: number) => async () => {
  const response = await api.get(`employee/feedback_rud/${dataId}/`);
  return response.data;
};

export const useGetFeedback = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "feedback", dataId],
    queryFn: fetchFeedback(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
