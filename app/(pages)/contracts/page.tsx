"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import { useContractsList } from "@/utils/contracts/getContractsList";
import ContractsList from "@/components/ContractsList";

const Finances = () => {
  const queryResult = useContractsList();
  return (
    <>
      <Breadcrumb pageName="Contracten" />
      <Panel
        title={"Contracten"}
        sideActions={<LinkButton href={"/clients"} text="Nieuw contract" />}
      >
        <ContractsList queryResult={queryResult} />
      </Panel>
    </>
  );
};

export default Finances;
