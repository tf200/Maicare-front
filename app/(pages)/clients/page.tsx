import React, { FunctionComponent } from "react";
import Link from "next/link";

const ClientsPage: FunctionComponent = (props) => {
  return (
    <div>
      <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Clients list (WORK IN PROGRESS!)
          </h3>
        </div>

        <div className="p-4 md:p-6 xl:p-9">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Link
              href={`/clients/new`}
              className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add new client
            </Link>
            <Link
              href={`/clients/2/diagnosis`}
              className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Diagnosis list
            </Link>
            <Link
              href={`/clients/2/diagnosis/new`}
              className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add new diagnosis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
