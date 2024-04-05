import api from "@/utils/api";
import { NotificationsListDto } from "@/types/notifications/notifications-list.dto";
import { useQuery } from "react-query";

async function getNotifications() {
  const notifications = await api.get<NotificationsListDto>(
    "/system/notifications"
  );
  return notifications.data;
}

export const useNotifications = () => {
  return useQuery(["notifications"], getNotifications);
};
