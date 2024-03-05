import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import MedicationForm from "@/components/forms/MedicationForm";

const NewMedicationPage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; medicationId: number };
}) => {
  console.log(params);
  
  return (
    <>
      <Breadcrumb pageName="Update Medication" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Update Medication"}>
          <MedicationForm
            medicationId={params.medicationId}
            mode={"edit"}
            clientId={parseInt(params.clientId)}
          />
        </Panel>
      </div>
    </>
  );
};

export default NewMedicationPage;
