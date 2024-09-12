import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import YouthCareIntakeForm from "@/components/forms/youthCareIntakeForm";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; youthCareIntake: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Update Intake Jeugdzorg" />
      <div className="grid grid-cols-1 gap-9">
        <YouthCareIntakeForm
          mode={"edit"}
          YouthCareIntakeFormId={params.youthCareIntake}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
