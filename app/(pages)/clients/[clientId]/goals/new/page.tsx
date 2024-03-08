import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GoalsForm from "@/components/forms/GoalsForm";
import Panel from "@/components/Panel";

const GoalDocument: FunctionComponent = ({
  params,
}: {
  params: { clientId: string };
}) => {
  return (
    <>
      <Breadcrumb pageName="Nieuw Doel" />

      <div className="grid sm:grid-cols-2">
        <Panel title="Nieuw Doel Toevoegen" containerClassName="">
          <GoalsForm
            mode="new"
            goalId={parseInt(params.clientId)}
            clientId={parseInt(params.clientId)}
          />
        </Panel>
      </div>
    </>
  );
};

export default GoalDocument;
