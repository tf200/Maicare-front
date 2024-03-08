import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GoalsForm from "@/components/forms/GoalsForm";
import Panel from "@/components/Panel";

const GoalDocument: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; goalId: string };
}) => {
  return (
    <>
      <Breadcrumb pageName="Doel bijwerken" />
      
      <div className="grid sm:grid-cols-2">
        <Panel title="Doel bijwerken" containerClassName="">
          <GoalsForm
            mode="edit"
            goalId={parseInt(params.goalId)}
            clientId={parseInt(params.clientId)}
          />
        </Panel>
      </div>
    </>
  );
};

export default GoalDocument;
