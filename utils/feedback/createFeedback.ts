import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { FeedbackFormType } from "@/components/forms/FeedbackForm";
import { NewFeedbackReqDto } from "@/types/feedback/new-feedback-req-dto";

async function createFeedback(data: NewFeedbackReqDto): Promise<NewFeedbackReqDto> {
  const res = await api.post<NewFeedbackReqDto>("employee/feedback_cl/", data);
  return res.data;
}

export const useCreateFeedback = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FeedbackFormType) => {
      return createFeedback({
        ...data,
        client,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([client, "feedback"]);
    },
  });
};
