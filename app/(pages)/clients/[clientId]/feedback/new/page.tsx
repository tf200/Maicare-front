import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FeedbackForm from "@/components/forms/FeedbackForm";

const NewFeedback: FunctionComponent = ({ params }: { params: { clientId: string } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuwe Feedback" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Feedback Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-c_black dark:text-white">
                Nieuwe Feedback Toevoegen
              </h3>
            </div>
            <FeedbackForm mode={"new"} clientId={parseInt(params.clientId)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewFeedback;
