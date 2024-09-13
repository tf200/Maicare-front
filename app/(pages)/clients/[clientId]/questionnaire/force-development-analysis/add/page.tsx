import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ForceDevelopmentAnalysisForm from "@/components/forms/forceDevelopmentAnalyses";

type Props = {
  params: {
    clientId: string;
  };
};

const NewRegistrationForm: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuwe Krachtontwikkelingsanalyses" />
      <div className="grid grid-cols-1 gap-9">
        <ForceDevelopmentAnalysisForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewRegistrationForm;
