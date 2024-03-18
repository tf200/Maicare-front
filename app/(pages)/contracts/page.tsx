"use client";
import React, { useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import { useContractsList } from "@/utils/contracts/getContractsList";
import ContractsList from "@/components/ContractsList";
import Button from "@/components/buttons/Button";
import ClientSelectModal from "@/components/Modals/ClientSelectModal";
import { useModal } from "@/components/providers/ModalProvider";
import { useRouter } from "next/navigation";

const Finances = () => {
  const queryResult = useContractsList();
  const { open } = useModal(ClientSelectModal);
  const router = useRouter();
  const selectClient = useCallback(() => {
    open({
      onSelect: (clientId) => {
        router.push(`/clients/${clientId}/contracts/new/`);
      },
    });
  }, [open, router]);
  return (
    <>
      <Breadcrumb pageName="Contracten" />
      <Panel
        title={"Contracten"}
        sideActions={<Button onClick={selectClient}>Nieuw contract</Button>}
      >
        <ContractsList queryResult={queryResult} />
      </Panel>
    </>
  );
};

export default Finances;
