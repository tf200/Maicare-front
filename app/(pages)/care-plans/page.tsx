"use client";

import React, { FunctionComponent, useCallback } from "react";
import { useModal } from "@/components/providers/ModalProvider";
import ClientSelectModal from "@/components/Modals/ClientSelectModal";
import { useRouter } from "next/navigation";

const Page: FunctionComponent = (props) => {
  const { open } = useModal(ClientSelectModal);
  const router = useRouter();
  const selectClient = useCallback(() => {
    open({
      onSelect: (clientId) => {},
    });
  }, [open, router]);

  return <></>;
};

export default Page;
