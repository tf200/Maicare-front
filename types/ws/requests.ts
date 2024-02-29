type MessageRequest = {
  type: "message";
  message: string;
  recipient_id: number;
  conversation_id: number;
};

type WSRequest = MessageRequest; // | ... other request types

export default WSRequest;
