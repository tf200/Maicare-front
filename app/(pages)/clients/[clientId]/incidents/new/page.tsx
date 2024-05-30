import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import IncidentForm from "@/components/forms/IncidentForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewIncidentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="New Incident" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Add New Incident"}>
          <IncidentForm mode={"new"} clientId={parseInt(clientId)} />
        </Panel>
      </div>
    </>
  );
};

export default NewIncidentsPage;
