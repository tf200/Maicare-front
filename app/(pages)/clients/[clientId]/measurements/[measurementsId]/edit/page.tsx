import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MeasurementsForm from "@/components/forms/MeasurementsForm";

const EditMeasurement: FunctionComponent = ({
  params,
}: {
  params: { clientId: string; measurementsId: number };
}) => {
  return (
    <>
      <Breadcrumb pageName="Bijwerken meting" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Measurements Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bijwerken meting
              </h3>
            </div>
            <MeasurementsForm
              mode="edit"
              measurementsId={params.measurementsId}
              clientId={parseInt(params.clientId)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMeasurement;
