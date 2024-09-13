import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ForceDevelopmentAnalysisForm from "@/components/forms/forceDevelopmentAnalyses";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; forceDevelopmentAnalysisId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Update Krachtontwikkelingsanalyses" />
      <div className="grid grid-cols-1 gap-9">
        <ForceDevelopmentAnalysisForm
          mode={"edit"}
          forceDevelopmentAnalysis={params.forceDevelopmentAnalysisId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
