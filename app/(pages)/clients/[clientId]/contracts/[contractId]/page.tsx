import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import ContractDetails from "@/components/ContractDetails";
import Link from "next/link";
import LinkButton from "@/components/buttons/LinkButton";

type Props = {
  params: { clientId: string; contractId: string };
};

const Page: FunctionComponent<Props> = ({
  params: { clientId, contractId },
}) => {
  return (
    <div>
      <Panel
        title={"Contract #" + contractId}
        sideActions={
          <LinkButton
            href={`/clients/${clientId}/contracts/${contractId}/edit`}
            text={"Bewerk contract"}
          />
        }
      >
        <ContractDetails
          clientId={parseInt(clientId)}
          contractId={parseInt(contractId)}
        />
      </Panel>
    </div>
  );
};

export default Page;
