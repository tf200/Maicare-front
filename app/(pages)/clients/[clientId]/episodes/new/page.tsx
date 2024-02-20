import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import EpisodeForm from "@/components/forms/EpisodeForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewMedicationPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  return (
    <>
      <Breadcrumb pageName="Registreer Nieuwe Episode" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Registreer een Nieuwe Allergie"}>
          <EpisodeForm clientId={parseInt(clientId)} />
        </Panel>
      </div>
    </>
  );
};

export default NewMedicationPage;
