import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmergencyContactForm from "@/components/forms/EmergencyContactForm";

const NewEmergencyContact: FunctionComponent = ({
  params,
}: {
  params: { clientId: string };
}) => {
  return (
    <>
      <Breadcrumb pageName="Nieuw Noodcontact" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Creëer een Nieuw Noodcontact
              </h3>
            </div>
            <EmergencyContactForm
              mode="new"
              clientId={parseInt(params.clientId)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewEmergencyContact;
