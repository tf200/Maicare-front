import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ClientsForm from "@/components/forms/ClientsForm";
import React, { FunctionComponent } from "react";

type PropsType = {
  params: { clientId: string };
};

const UpdateClients: FunctionComponent<PropsType> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="Cliënt Bijwerken" />
      <ClientsForm clientId={parseInt(clientId)} mode={"edit"} />
    </>
  );
};

export default UpdateClients;
