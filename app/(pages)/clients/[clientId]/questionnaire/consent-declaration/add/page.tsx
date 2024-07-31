import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ConsentDeclarationForm from "@/components/forms/consent-declaration";

type Props = {
  params: {
    clientId: string;
  };
};

const NewConsentDeclaration: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="nieuwe toestemmingsverklaring" />
      <div className="grid grid-cols-1 gap-9">
        <ConsentDeclarationForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewConsentDeclaration;
