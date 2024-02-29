import React, { FunctionComponent } from "react";
import ChatBox from "@/components/messages/ChatBox";

type Props = {
  params: {
    conversationId: string;
  };
};

const Page: FunctionComponent<Props> = ({ params: { conversationId } }) => {
  return <ChatBox conversationId={+conversationId} />;
};

export default Page;
