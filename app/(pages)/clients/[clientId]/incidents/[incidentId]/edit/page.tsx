import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import EpisodeForm from "@/components/forms/EpisodeForm";
import IncidentForm from "@/components/forms/IncidentFormNew";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; incidentId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken aflevering" />
      <div className="grid grid-cols-1 gap-9">
        <Panel title={"Bijwerken aflevering"}>
          <IncidentForm
            mode={"edit"}
            incidentId={params.incidentId}
            clientId={parseInt(params.clientId)}
          />
        </Panel>
      </div>
    </>
  );
};

export default UpdateEpisodePage;
