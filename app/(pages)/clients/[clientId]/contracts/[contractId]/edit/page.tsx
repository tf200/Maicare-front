"use client";

import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import ContractForm from "@/components/forms/ContractForm";
import { useContractDetails } from "@/utils/contracts/getContractDetails";
import { useParams } from "next/navigation";

const EditContract: FunctionComponent = () => {
  const { clientId, contractId } = useParams();
  const { data } = useContractDetails(parseInt(clientId), parseInt(contractId));
  return (
    <>
      <Breadcrumb pageName="Contract Bewerken" />
      <Panel
        title={"Bewerk zijn contract"}
        containerClassName="px-7 py-4"
        className="col-span-2"
      >
        {data && (
          <ContractForm
            mode="update"
            initialData={data}
            onSuccess={() => {}}
            clientId={parseInt(clientId)}
          />
        )}
      </Panel>
    </>
  );
};

export default EditContract;
