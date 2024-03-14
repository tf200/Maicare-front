"use client";

import React, { FunctionComponent } from "react";
import { useClientContractsList } from "@/utils/contracts/getClientContractsList";
import ContractsList from "@/components/ContractsList";
import LinkButton from "@/components/buttons/LinkButton";
import Panel from "@/components/Panel";

type Props = {
  params: { clientId: string };
};

const ContractsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const queryResult = useClientContractsList(parseInt(clientId));

  return (
    <Panel
      title={"Contractenlijst"}
      sideActions={
        <LinkButton text={"Nieuw contract toevoegen"} href={`contracts/new`} />
      }
    >
      <ContractsList queryResult={queryResult} />
    </Panel>
  );
};

export default ContractsPage;
