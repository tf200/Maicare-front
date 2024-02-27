export const NotificationTypes = [
  "calendar",
  "client",
  "invoice",
  "payment",
  "task",
  "user",
  "workorder",
  "other",
] as const;

export type NotificationType = (typeof NotificationTypes)[number];

export type NotificationItem = {
  text: string;
  title: string;
  type: NotificationType;
  read: boolean;
  id: number;
  createdAt: string;
};

export type NotificationsListDto = NotificationItem[];
