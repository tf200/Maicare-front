import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RegistrationForm from "@/components/forms/registration-form";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; registrationFormId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Registratieformulier bijwerken" />
      <div className="grid grid-cols-1 gap-9">
        <RegistrationForm
          mode={"edit"}
          registrationFormId={params.registrationFormId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
