import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CollaborationAgreementForm from "@/components/forms/CollaborationAgreementForm";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; collabId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Update samenwerkingsovereenkomst" />
      <div className="grid grid-cols-1 gap-9">
        <CollaborationAgreementForm
          mode={"edit"}
          collabId={params.collabId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
