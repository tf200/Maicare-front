import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import IncidentForm from "@/components/forms/IncidentFormNew";

type Props = {
  params: {
    clientId: string;
  };
};

const NewIncidentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="New Incident" />
      <div className="grid grid-cols-1 gap-9">
        <IncidentForm mode={"new"} clientId={parseInt(clientId)} />
      </div>
    </>
  );
};

export default NewIncidentsPage;
