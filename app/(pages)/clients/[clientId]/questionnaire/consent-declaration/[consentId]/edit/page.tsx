import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ConsentDeclarationForm from "@/components/forms/consent-declaration";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; consentId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Update samenwerkingsovereenkomst" />
      <div className="grid grid-cols-1 gap-9">
        <ConsentDeclarationForm
          mode={"edit"}
          consentId={params.consentId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
