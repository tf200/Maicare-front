import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CollaborationAgreementForm from "@/components/forms/CollaborationAgreementForm";
import RiskAssessementsForm from "@/components/forms/RiskAssessementsForm";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; riskId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Risicobeoordeling bijwerken" />
      <div className="grid grid-cols-1 gap-9">
        <RiskAssessementsForm
          mode={"edit"}
          riskId={params.riskId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
