import React, { FunctionComponent } from "react";
import Link from "next/link";
import { NotificationItem } from "@/types/notifications/notifications-list.dto";
import { shortDateTimeFormat } from "@/utils/timeFormatting";
import { useMarkAsRead } from "@/utils/notifications/markAsRead";
import { useMedicalRecordNotif } from "@/hooks/useMedicalRecordNotif";

type Props = {
  notifications: NotificationItem[];
};

const Notifications: FunctionComponent<Props> = ({ notifications }) => {
  return (
    <>
      <div className="px-4.5 py-3">
        <h5 className="text-sm font-medium text-bodydark2">Meldingen</h5>
      </div>

      <ul className="flex h-auto flex-col overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        <li>
          <Link
            href="/notifications"
            className="flex flex-col border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
          >
            <p className="text-sm mb-0 text-c_black dark:text-white font-bold text-center">
              View all
            </p>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Notifications;

type NotificationItemProps = {
  notification: NotificationItem;
};

const NotificationItem: FunctionComponent<NotificationItemProps> = ({ notification }) => {
  const { mutate: markAsRead } = useMarkAsRead();
  const { reportMedication } = useMedicalRecordNotif();
  return (
    <li
      className={notification.is_read ? "" : "font-bold"}
      onClick={() => {
        if (notification.event === "medication_time") {
          reportMedication(notification.metadata.medication_record_id);
        }
        markAsRead(notification.id);
      }}
    >
      <Link
        className="flex flex-col border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
        href="#"
      >
        <p className="text-sm mb-0 text-c_black dark:text-white">{notification.title}</p>
        <p className="text-sm mb-2.5 max-h-20 overflow-hidden line-clamp-4 text-ellipsis">
          {notification.content}
        </p>

        <p className="text-xs">{shortDateTimeFormat(notification.created)}</p>
      </Link>
    </li>
  );
};
