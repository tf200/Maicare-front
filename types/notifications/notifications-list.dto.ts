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
  content: string;
  title: string;
  event: NotificationType;
  is_read: boolean;
  id: number;
  createdAt: string;
};

export type NotificationsListDto = Paginated<NotificationItem>;
