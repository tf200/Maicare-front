"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { PropsWithChildren } from "react";
import MessagesLeftPanel from "@/components/messages/MessagesLeftPanel";

const Messages: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Breadcrumb pageName="Conversations" />

      <div className="h-[calc(100vh-230px)] overflow-hidden">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <MessagesLeftPanel />
          <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
