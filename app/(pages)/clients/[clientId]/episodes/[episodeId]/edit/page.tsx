import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import EpisodeForm from "@/components/forms/EpisodeForm";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; episodeId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken aflevering" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Bijwerken aflevering"}>
          <EpisodeForm
            mode={"edit"}
            episodeId={params.episodeId}
            clientId={parseInt(params.clientId)}
          />
        </Panel>
      </div>
    </>
  );
};

export default UpdateEpisodePage;
