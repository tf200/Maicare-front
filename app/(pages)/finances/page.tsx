"use client";

import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import { AllInvoicesList } from "@/components/InvoicesList";
import { useModal } from "@/components/providers/ModalProvider";
import GenerateInvoiceModal from "@/components/Modals/GenerateInvoiceModal";
import Button from "@/components/buttons/Button";

const Page: FunctionComponent = () => {
  const { open } = useModal(GenerateInvoiceModal);
  return (
    <Panel
      title={"Financiën"}
      sideActions={
        <Button className="px-4 py-2" onClick={open}>
          Genereer factuur
        </Button>
      }
    >
      <AllInvoicesList />
    </Panel>
  );
};

export default Page;
