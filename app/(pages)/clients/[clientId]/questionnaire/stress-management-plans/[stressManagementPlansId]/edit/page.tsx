import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import StressManagementPlansForm from "@/components/forms/StressManagementPlansForm";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; stressManagementPlansId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Stressmanagementplannen" />
      <div className="grid grid-cols-1 gap-9">
        <StressManagementPlansForm
          mode={"edit"}
          stressManagementPlansId={params.stressManagementPlansId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;