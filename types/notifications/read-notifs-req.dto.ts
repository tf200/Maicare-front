import { NotificationItem } from "@/types/notifications/notifications-list.dto";

export type ReadNotifsReqDto = {
  notificationIds: NotificationItem["id"][];
};
