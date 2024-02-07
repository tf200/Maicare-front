import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import ContractForm from "@/components/forms/ContractForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewContractPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  return (
    <>
      <Breadcrumb pageName="New Contract" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Create a New Contract"} containerClassName="px-7 py-4">
          <ContractForm clientId={parseInt(clientId)} />
        </Panel>
      </div>
    </>
  );
};

export default NewContractPage;
