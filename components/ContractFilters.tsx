import React, { FunctionComponent } from "react";
import { ContractFilterFormType } from "@/types/contracts";
import { FormikProvider, useFormik } from "formik";
import Select from "@/components/FormFields/Select";
import {
  CARE_TYPE_OPTIONS,
  CONTRACT_STATUS_OPTIONS,
  STATUS_OPTIONS,
} from "@/consts";
import Button from "@/components/buttons/Button";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import ContactSelector from "@/components/FormFields/comboboxes/ContactSelector";

const ContractFilters: FunctionComponent<{
  onSubmit: (values: ContractFilterFormType) => void;
}> = (props) => {
  const formik = useFormik<ContractFilterFormType>({
    initialValues: {
      sender: null,
      client: null,
      care_type: "",
      status: "",
    },
    onSubmit: props.onSubmit,
  });
  const {
    handleSubmit,
    handleReset,
    submitForm,
    handleChange,
    values,
    handleBlur,
  } = formik;
  return (
    <FormikProvider value={formik}>
      <form
        className="flex flex-wrap items-end gap-4 px-7 py-4"
        onSubmit={handleSubmit}
      >
        <ClientSelector name={"client"} />
        <ContactSelector name={"sender"} />
        <Select
          label="Zorgtype"
          name="care_type"
          value={values.care_type}
          onChange={handleChange}
          onBlur={handleBlur}
          options={CARE_TYPE_OPTIONS}
        />
        <Select
          label={"Status"}
          name={"status"}
          options={CONTRACT_STATUS_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
          className="min-w-47.5"
        />
        <div className="flex gap-4">
          <Button
            type="button"
            buttonType={"Outline"}
            onClick={(e) => {
              handleReset(e);
              submitForm();
            }}
          >
            Duidelijke Zoek
          </Button>
          <Button type="submit" onClick={submitForm}>
            Zoeken
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ContractFilters;
