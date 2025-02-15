import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ObservationForm from "@/components/forms/ObservationForm";

const NewObservation: FunctionComponent = ({ params }: { params: { clientId: string } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuwe Observatie" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Observation Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-slate-800  dark:text-white">
                Nieuwe Observatie Toevoegen
              </h3>
            </div>
            <ObservationForm mode={"new"} clientId={parseInt(params.clientId)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewObservation;
