import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ClientsForm from "@/components/forms/ClientsForm";
import React, { FunctionComponent } from "react";

const NewClients: FunctionComponent = () => {
  return (
    <>
      <Breadcrumb pageName="Add New Client" />

      {/* <div className="grid w-full grid-cols-1 gap-9 sm:grid-cols-2 ">
        <div className="flex flex-col gap-9"> */}
          {/* <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"> */}
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create New Client
              </h3>
            </div> */}
            <ClientsForm />
          {/* </div> */}
        {/* </div>
      </div> */}
    </>
  );
};

export default NewClients;
