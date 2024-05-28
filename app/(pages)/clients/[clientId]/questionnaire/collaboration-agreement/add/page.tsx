import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CollaborationAgreementForm from "@/components/forms/CollaborationAgreementForm";

type Props = {
  params: {
    clientId: string;
  };
};

const NewCollaborationAgreement: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuwe samenwerkingsovereenkomst" />
      <div className="grid grid-cols-1 gap-9">
        <CollaborationAgreementForm clientId={parseInt(clientId)} mode={"new"} />
      </div>
    </>
  );
};

export default NewCollaborationAgreement;
