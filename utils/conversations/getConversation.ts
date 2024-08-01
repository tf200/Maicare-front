import { useQuery } from "react-query";
import api from "@/utils/api";
import { ConversationResDto } from "@/types/conversations/conversation-res-dto";

async function getConversation(conversationId: string) {
  const response = await api.get<ConversationResDto>(`/chat/messages/${conversationId}/`);
  return response.data;
}

export const useConversation = (conversationId?: string) => {
  return useQuery(["conversation-details", conversationId], () => getConversation(conversationId), {
    enabled: !!conversationId,
  });
};
