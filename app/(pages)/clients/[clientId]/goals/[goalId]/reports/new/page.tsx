import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GoalsReportForm from "@/components/forms/GoalsReportsForm";
import Panel from "@/components/Panel";

const NewGoalReportDocument: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; goalId: string };
}) => {
  return (
    <>
      <Breadcrumb pageName="Voeg nieuw rapport toe aan doel" />

      <div className="grid sm:grid-cols-2">
        <Panel title="Voeg rapport toe aan geselecteerd doel" containerClassName="">
          <GoalsReportForm
            goalId={parseInt(params.goalId)}
            clientId={parseInt(params.clientId)}
          />
        </Panel>
      </div>
    </>
  );
};

export default NewGoalReportDocument;
