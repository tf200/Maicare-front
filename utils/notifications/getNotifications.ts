import api from "@/utils/api";
import { NotificationsListDto } from "@/types/notifications/notifications-list.dto";
import { useQuery } from "react-query";

async function getNotifications() {
  const notifications = await api.get<NotificationsListDto>(
    "/system/notifications",
    {
      params: {
        page: 1, // TODO: remove this
      },
    }
  );
  return notifications.data;
}

export const useNotifications = () => {
  return useQuery(["notifications"], getNotifications, {
    refetchInterval: 60000,
  });
};
