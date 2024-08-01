import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataSharingForm from "@/components/forms/DataSharingForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewConsentDeclaration: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="nieuwe Verklaring Gegevensdeling" />
      <div className="grid grid-cols-1 gap-9">
        <DataSharingForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewConsentDeclaration;
