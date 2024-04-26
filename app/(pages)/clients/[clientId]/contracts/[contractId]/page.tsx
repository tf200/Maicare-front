"use client";

import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import ContractDetails from "@/components/ContractDetails";
import LinkButton from "@/components/buttons/LinkButton";
import { useContractDetails } from "@/utils/contracts/getContractDetails";
import WorkingHours from "@/components/WorkingHours";

type Props = {
  params: { clientId: string; contractId: string };
};

const Page: FunctionComponent<Props> = ({
  params: { clientId, contractId },
}) => {
  const { data: contract, isLoading: isContractLoading } = useContractDetails(
    +clientId,
    +contractId
  );
  return (
    <div>
      <Panel
        title={"Contract #" + contractId}
        sideActions={
          contract?.status === "draft" && (
            <LinkButton
              href={`/clients/${clientId}/contracts/${contractId}/edit`}
              text={"Bewerk contract"}
            />
          )
        }
      >
        <ContractDetails
          clientId={parseInt(clientId)}
          contractId={parseInt(contractId)}
        />
        <WorkingHours contractId={parseInt(contractId)} />
      </Panel>
    </div>
  );
};

export default Page;
