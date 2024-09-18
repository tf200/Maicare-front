import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import StressManagementPlansForm from "@/components/forms/StressManagementPlansForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewStressManagementPlans: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuw Stressmanagementplannen" />
      <div className="grid grid-cols-1 gap-9">
        <StressManagementPlansForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewStressManagementPlans;
