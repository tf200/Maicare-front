import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const ProbationInitialValue = {
  probation_full_name: "",
  probation_organization: "",
  probation_phone: "",
};

export const ProbationShema = {
  probation_full_name: Yup.string().required("moet dit veld invullen"),
  probation_organization: Yup.string().required("moet dit veld invullen"),
  probation_phone: Yup.string().required("moet dit veld invullen"),
};

export default function ProbationForm({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"2. Reclassering"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Naam"
            className={"w-full"}
            id={"probation_full_name"}
            required={true}
            type={"text"}
            value={values.probation_full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.probation_full_name && errors.probation_full_name}
          />
          <InputField
            label="Organisatie"
            className={"w-full"}
            id={"probation_organization"}
            required={true}
            type={"text"}
            value={values.probation_organization}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.probation_organization && errors.probation_organization}
          />
          <InputField
            label="Telefoonummer"
            className={"w-full"}
            id={"probation_phone"}
            required={true}
            type={"text"}
            value={values.probation_phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.probation_phone && errors.probation_phone}
          />
        </div>
      </div>
    </Panel>
  );
}
