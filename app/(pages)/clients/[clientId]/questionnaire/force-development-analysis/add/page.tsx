import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import YouthCareIntakeForm from "@/components/forms/youthCareIntakeForm";

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
        <YouthCareIntakeForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewRegistrationForm;
