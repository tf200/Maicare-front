export type ConversationResDto = Paginated<MessageItem> & {
  involved: { id: number; name: string }[];
};
export type MessageItem = {
  id: string;
  content: string;
  timestamp: string;
  sender: number;
  read_status: boolean;
  conversation: number;
};
