import React, { FunctionComponent } from "react";
import ChatBox from "@/components/messages/ChatBox";

type Props = {
  params: {
    recipientId: string;
  };
};

const Page: FunctionComponent<Props> = ({ params: { recipientId } }) => {
  return <ChatBox recipientId={+recipientId} />;
};

export default Page;
