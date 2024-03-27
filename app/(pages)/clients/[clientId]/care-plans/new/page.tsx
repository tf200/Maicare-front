"use client";

import React, { FunctionComponent, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import CarePlanForm from "@/components/forms/CarePlanForm";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import Button from "@/components/buttons/Button";
import { FormikProvider, useFormik } from "formik";

const NewCarePlan: FunctionComponent<{
  params: {
    clientId: string;
  };
}> = ({ params: { clientId } }) => {
  return (
    <>
      <Breadcrumb pageName="Nieuw Zorgplan Registreren" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel
          title={"Nieuw Zorgplan Registreren"}
          containerClassName="px-7 py-4"
        >
          <CarePlanForm
            onSuccess={() => {}}
            mode={"add"}
            clientId={+clientId}
          />
        </Panel>
      </div>
    </>
  );
};

export default NewCarePlan;
