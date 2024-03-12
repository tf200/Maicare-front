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
      <Breadcrumb pageName="Nieuw Contract" />
      <Panel
        title={"Creëer een Nieuw Contract"}
        containerClassName="px-7 py-4"
        className="col-span-2"
      >
        <ContractForm clientId={parseInt(clientId)} />
      </Panel>
    </>
  );
};

export default NewContractPage;
