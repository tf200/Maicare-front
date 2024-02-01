import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import ClientInformation from "@/components/ClientInformation";

type Props = {
  params: { clientId: string };
};

const ClientDetailsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  return (
    <>
      <Breadcrumb pageName="Client details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Panel title={"Client information"} containerClassName="px-7 py-4">
            <ClientInformation clientId={clientId} />
          </Panel>
          <Panel title={"Emergency Contacts"} containerClassName="px-7 py-4">
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
            <p>These are emergency contacts</p>
          </Panel>
        </div>
        <div className="flex flex-col gap-9">
          <Panel title={"Medical Record"} containerClassName="px-7 py-4">
            <p>Diagnosis</p>
            <p>Treatment</p>
            <p>Treatment</p>
            <p>Diagnosis</p>
            <p>Treatment</p>
            <p>Diagnosis</p>
          </Panel>
          <Panel title={"Reports & Documents"} containerClassName="px-7 py-4">
            <p>Reports and documents</p>
            <p>Reports and documents</p>
            <p>Reports and documents</p>
            <p>Reports and documents</p>
            <p>Reports and documents</p>
          </Panel>
        </div>
      </div>
    </>
  );
};

export default ClientDetailsPage;
