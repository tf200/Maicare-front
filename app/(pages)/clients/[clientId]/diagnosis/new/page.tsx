import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DiagnosisForm from "@/components/forms/DiagnosisForm";

const NewDiagnostic: FunctionComponent = ({
  params,
}: {
  params: { clientId: string };
}) => {
  return (
    <>
      <Breadcrumb pageName="New Diagnosis" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Diagnosis Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create a New Diagnosis
              </h3>
            </div>
            <DiagnosisForm clientId={params.clientId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDiagnostic;
