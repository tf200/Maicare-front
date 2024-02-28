import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ClientsForm from "@/components/forms/ClientsForm";
import React, { FunctionComponent } from "react";

const NewClients: FunctionComponent = () => {
  return (
    <>
      <Breadcrumb pageName="Nieuwe Cliënt Toevoegen" />
      <ClientsForm mode={"new"} />
    </>
  );
};

export default NewClients;
