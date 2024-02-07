import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import ContractDetails from "@/components/ContractDetails";

type Props = {
  params: { clientId: string; contractId: string };
};

const Page: FunctionComponent<Props> = ({
  params: { clientId, contractId },
}) => {
  return (
    <div>
      <Panel title={"Contract #" + contractId}>
        <ContractDetails
          clientId={parseInt(clientId)}
          contractId={parseInt(contractId)}
        />
      </Panel>
    </div>
  );
};

export default Page;
