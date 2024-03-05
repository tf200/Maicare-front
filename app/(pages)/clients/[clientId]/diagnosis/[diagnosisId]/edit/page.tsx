"use client";
import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DiagnosisForm from "@/components/forms/DiagnosisForm";

const UpdateDiagnostic: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; diagnosisId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken diagnose" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Diagnosis Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bijwerken diagnose
              </h3>
            </div>
            <DiagnosisForm
              mode={"edit"}
              diagnosisId={params.diagnosisId}
              clientId={parseInt(params.clientId)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDiagnostic;
