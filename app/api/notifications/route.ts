import { NextRequest, NextResponse } from "next/server";
import {
  NotificationsListDto,
  NotificationTypes,
} from "@/types/notifications/notifications-list.dto";

export const MOCK_NOTIFICATIONS: NotificationsListDto = fetchNotifications(5);

function fetchNotifications(items = 10): NotificationsListDto {
  let notifications: NotificationsListDto = [];

  for (let i = 1; i <= items; i++) {
    notifications.push({
      id: i,
      title: `Notification ${i}`,
      text: `${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      type: NotificationTypes[i % items],
      createdAt: new Date().toUTCString(),
      read: false,
    });
  }

  return notifications;
}

export async function GET(req: NextRequest) {
  return NextResponse.json<NotificationsListDto>(MOCK_NOTIFICATIONS);
}
