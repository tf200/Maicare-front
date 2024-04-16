import api from "@/utils/api";
import { NotificationsListDto } from "@/types/notifications/notifications-list.dto";
import { useQuery } from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";

async function getNotifications(params: PaginationParams) {
  const notifications = await api.get<NotificationsListDto>(
    "/system/notifications",
    {
      params,
    }
  );
  return notifications.data;
}

export const useNotifications = () => {
  const paginationParams = usePaginationParams();
  const query = useQuery(["notifications"], () =>
    getNotifications(paginationParams.params)
  );

  return {
    ...query,
    page: paginationParams.page,
    setPage: paginationParams.setPage,
  };
};

async function getLatestNotifications() {
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

export const useLatestNotifications = () => {
  const query = useQuery(["latestNotifications"], getLatestNotifications, {
    refetchInterval: 60000,
  });

  return query;
};
