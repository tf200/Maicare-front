import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import MedicationForm from "@/components/forms/MedicationForm";
type Props = {
  params: {
    clientId: string;
  };
};

const NewMedicationPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  return (
    <>
      <Breadcrumb pageName="New Medication" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Create a New Medication"}>
          <MedicationForm clientId={parseInt(clientId)} />
        </Panel>
      </div>
    </>
  );
};

export default NewMedicationPage;
