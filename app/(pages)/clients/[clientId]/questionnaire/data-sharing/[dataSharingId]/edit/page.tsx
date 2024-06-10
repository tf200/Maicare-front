import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataSharingForm from "@/components/forms/DataSharingForm";

const UpdateEpisodePage: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; dataSharingId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Update samenwerkingsovereenkomst" />
      <div className="grid grid-cols-1 gap-9">
        <DataSharingForm
          mode={"edit"}
          dataSharingId={params.dataSharingId}
          clientId={parseInt(params.clientId)}
        />
      </div>
    </>
  );
};

export default UpdateEpisodePage;
