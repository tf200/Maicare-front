import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GoalsForm from "@/components/forms/GoalsForm";

const GoalDocument: FunctionComponent = ({
  params,
}: {
  params: { clientId: string };
}) => {
  return (
    <>
      <Breadcrumb pageName="Nieuw Doel" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Nieuw Doel Toevoegen
              </h3>
            </div>
            <GoalsForm mode="new" clientId={parseInt(params.clientId)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalDocument;
