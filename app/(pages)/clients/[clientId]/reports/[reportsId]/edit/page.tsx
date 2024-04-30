import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReportsForm from "@/components/forms/ReportsForm";

const EditReports: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; reportsId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken verslag" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Reports Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bijwerken verslag
              </h3>
            </div>
            <ReportsForm
              mode={"edit"}
              reportsId={params.reportsId}
              clientId={+params.clientId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditReports;
