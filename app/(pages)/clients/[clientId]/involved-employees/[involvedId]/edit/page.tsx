import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InvolvedEmployeesForm from "@/components/forms/InvolvedEmployeesForm";

const UpdateInvolved: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; involvedId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken betrokken medewerkers" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-c_black dark:text-white">
                Bijwerken betrokken medewerkers
              </h3>
            </div>
            <InvolvedEmployeesForm
              mode={"edit"}
              involvedId={params.involvedId}
              clientId={parseInt(params.clientId)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateInvolved;
