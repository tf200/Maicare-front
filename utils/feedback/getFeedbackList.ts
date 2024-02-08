import api from "@/utils/api";
import { useQuery } from "react-query";
import { useState } from "react";
import { FeedbackListResDto } from "@/types/feedback/feedback-list-res-dto";

async function getFeedbackList(clientId: number, page = 1) {
  const res = await api.get<FeedbackListResDto>(
    `employee/feedback_list/${clientId}`,
    {
      params: {
        page,
      },
    }
  );
  return res.data;
}

export const useFeedbackList = (clientId: number) => {
  const [page, setPage] = useState(1);

  const query = useQuery<FeedbackListResDto>({
    queryKey: [clientId, "feedback", page],
    queryFn: () => getFeedbackList(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
