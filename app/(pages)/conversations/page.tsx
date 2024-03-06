import React, { FunctionComponent } from "react";
import SendMessage from "@/components/SendMessage";

const Page: FunctionComponent = (props) => {
  return (
    <SendMessage
      firstLine={"Start a conversation"}
      secondLine={"Send a message to someone to start a conversation"}
    />
  );
};

export default Page;
