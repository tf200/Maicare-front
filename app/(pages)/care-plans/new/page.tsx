"use client";

import React, { FunctionComponent, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import CarePlanForm from "@/components/forms/CarePlanForm";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import Button from "@/components/buttons/Button";
import { FormikProvider, useFormik } from "formik";

const NewCarePlan: FunctionComponent = (props) => {
  const [selectedClient, setSelectedClient] = useState<number>();
  return (
    <>
      <Breadcrumb pageName="Nieuw Zorgplan Registreren" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel
          title={"Nieuw Zorgplan Registreren"}
          containerClassName="px-7 py-4"
        >
          {!selectedClient && <SelectClient onSelect={setSelectedClient} />}
          {selectedClient && (
            <CarePlanForm
              onSuccess={() => {}}
              mode={"add"}
              clientId={selectedClient}
            />
          )}
        </Panel>
      </div>
    </>
  );
};

export default NewCarePlan;

const SelectClient: FunctionComponent<{
  onSelect: (clientId: number) => void;
}> = ({ onSelect }) => {
  const formik = useFormik({
    initialValues: {
      client: undefined,
    },
    onSubmit: (values) => {
      onSelect(values.client);
    },
  });
  return (
    <FormikProvider value={formik}>
      <h2 className="mb-6">Selecteer een klant om een zorgplan te maken</h2>
      <form onSubmit={formik.handleSubmit}>
        <ClientSelector name={"client"} className={"mb-6"} />
        <Button type={"submit"}>Nieuw Zorgplan Registreren</Button>
      </form>
    </FormikProvider>
  );
};
