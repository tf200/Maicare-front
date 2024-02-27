import { mockApi } from "@/utils/api";
import { NotificationsListDto } from "@/types/notifications/notifications-list.dto";
import { useQuery } from "react-query";

async function getNotifications() {
  const notifications =
    await mockApi.get<NotificationsListDto>("/notifications");
  return notifications.data;
}

export const useNotifications = () => {
  return useQuery(["notifications"], getNotifications);
};
