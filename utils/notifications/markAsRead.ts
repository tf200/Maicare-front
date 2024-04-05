import { ReadNotifsReqDto } from "@/types/notifications/read-notifs-req.dto";
import { mockApi } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function markAsRead(req: ReadNotifsReqDto) {
  const response = await mockApi.post(
    `/system/notifications/${req.notificationIds}/read/`
  );
  return response.data;
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
