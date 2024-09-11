import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RegistrationForm from "@/components/forms/registration-form";

type Props = {
  params: {
    clientId: string;
  };
};

const NewRegistrationForm: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="nieuw registratieformulier" />
      <div className="grid grid-cols-1 gap-9">
        <RegistrationForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewRegistrationForm;
