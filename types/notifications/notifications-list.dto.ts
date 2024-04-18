export const NotificationTypes = [
  "calendar",
  "client",
  "invoice",
  "payment",
  "task",
  "user",
  "workorder",
  "medication_time",
  "other",
] as const;

export type NotificationType = (typeof NotificationTypes)[number];

export type NotificationItem = {
  metadata: any;
  content: string;
  title: string;
  event: NotificationType;
  is_read: boolean;
  id: number;
  created: string;
};

export type NotificationsListDto = Paginated<NotificationItem>;
