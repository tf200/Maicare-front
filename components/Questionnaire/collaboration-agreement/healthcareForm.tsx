import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const HealthInitialValue = {
  healthcare_institution_name: "",
  healthcare_institution_organization: "",
  healthcare_institution_phone: "",
};

export const HealthShema = {
  healthcare_institution_name: Yup.string().required("shouldn't be empty"),
  healthcare_institution_organization: Yup.string().required("shouldn't be empty"),
  healthcare_institution_phone: Yup.string().required("shouldn't be empty"),
};

export default function HealthForm({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"3. Zorginstelling"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Naam"
            className={"w-full"}
            id={"healthcare_institution_name"}
            required={true}
            type={"text"}
            value={values.healthcare_institution_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.healthcare_institution_name && errors.healthcare_institution_name}
          />
          <InputField
            label="Organisatie"
            className={"w-full"}
            id={"healthcare_institution_organization"}
            required={true}
            type={"text"}
            value={values.healthcare_institution_organization}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.healthcare_institution_organization &&
              errors.healthcare_institution_organization
            }
          />
          <InputField
            label="Telefoonummer"
            className={"w-full"}
            id={"healthcare_institution_phone"}
            required={true}
            type={"text"}
            value={values.string}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.healthcare_institution_phone && errors.healthcare_institution_phone}
          />
        </div>
      </div>
    </Panel>
  );
}
