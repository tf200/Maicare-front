import React, { FunctionComponent } from "react";
import Link from "next/link";
import {
  NotificationItem,
  NotificationsListDto,
} from "@/types/notifications/notifications-list.dto";
import { dateFormat } from "@/utils/timeFormatting";
import { useMarkAsRead } from "@/utils/notifications/markAsRead";

type Props = {
  notifications: NotificationsListDto;
};

const Notifications: FunctionComponent<Props> = ({ notifications }) => {
  return (
    <>
      <div className="px-4.5 py-3">
        <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
      </div>

      <ul className="flex h-auto flex-col overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </>
  );
};

export default Notifications;

type NotificationItemProps = {
  notification: NotificationItem;
};

const NotificationItem: FunctionComponent<NotificationItemProps> = ({
  notification,
}) => {
  const { mutate: markAsRead } = useMarkAsRead();
  return (
    <li
      className={notification.read ? "" : "font-bold"}
      onClick={() => {
        markAsRead({ notificationIds: [notification.id] });
      }}
    >
      <Link
        className="flex flex-col border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
        href="#"
      >
        <p className="text-sm mb-0 text-black dark:text-white">
          {notification.title}
        </p>
        <p className="text-sm mb-2.5 max-h-20 overflow-hidden line-clamp-4 text-ellipsis">
          {notification.text}
        </p>

        <p className="text-xs">{dateFormat(notification.createdAt)}</p>
      </Link>
    </li>
  );
};
