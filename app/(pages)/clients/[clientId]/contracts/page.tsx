"use client";

import React, { FunctionComponent } from "react";
import { useClientContractsList } from "@/utils/contracts/getClientContractsList";
import ContractsList from "@/components/ContractsList";
import LinkButton from "@/components/buttons/LinkButton";
import Panel from "@/components/Panel";
import { useMyPermissions } from "@/components/SecureWrapper";
import { CONTRACT_CREATE, CONTRACT_VIEW } from "@/consts";

type Props = {
  params: { clientId: string };
};

const ContractsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const queryResult = useClientContractsList(parseInt(clientId));
  const { hasPerm } = useMyPermissions();
  return (
    <Panel
      title={"Contractenlijst"}
      sideActions={
        hasPerm(CONTRACT_CREATE) && (
          <LinkButton text={"Nieuw contract toevoegen"} href={`contracts/new`} />
        )
      }
    >
      <ContractsList queryResult={queryResult} />
    </Panel>
  );
};

export default ContractsPage;
