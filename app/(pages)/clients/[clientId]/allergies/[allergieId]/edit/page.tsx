import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import AllergyForm from "@/components/forms/AllergyForm";

const UpdateMedicationPage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; allergieId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken allergie" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Bijwerken allergie"}>
          <AllergyForm mode={"edit"} allergieId={params.allergieId} clientId={parseInt(params.clientId)} />
        </Panel>
      </div>
    </>
  );
};

export default UpdateMedicationPage;
