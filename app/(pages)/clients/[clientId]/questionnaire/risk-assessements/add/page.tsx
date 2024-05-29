import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RiskAssessementsForm from "@/components/forms/RiskAssessementsForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewRiskAssessements: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuwe risicobeoordeling" />
      <div className="grid grid-cols-1 gap-9">
        <RiskAssessementsForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewRiskAssessements;
