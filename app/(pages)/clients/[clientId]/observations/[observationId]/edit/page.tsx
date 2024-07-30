import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ObservationForm from "@/components/forms/ObservationForm";

const EditObservation: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; observationId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken observatie" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Observation Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-c_black dark:text-white">Bijwerken observatie</h3>
            </div>
            <ObservationForm
              mode={"edit"}
              observationId={params.observationId}
              clientId={parseInt(params.clientId)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditObservation;
