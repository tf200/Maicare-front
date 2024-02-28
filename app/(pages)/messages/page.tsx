"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import MessagesLeftPanel from "@/components/MessagesLeftPanel";
import ChatBox from "@/components/ChatBox";

const Messages: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Messages" />

      <div className="h-[calc(100vh-230px)] overflow-hidden">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <MessagesLeftPanel />
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Messages;
