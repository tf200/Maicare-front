import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const BehaviorOffensiveInitialValue = {
  committed_offences_description: "",
  offences_frequency_seriousness: "",
  age_first_offense: "",
  circumstances_surrounding_crimes: "",
  offenses_recations: "",
};

export const BehaviorOffensiveShema = {
  committed_offences_description: Yup.string().required("moet dit veld invullen"),
  offences_frequency_seriousness: Yup.string().required("moet dit veld invullen"),
  age_first_offense: Yup.string().required("moet dit veld invullen"),
  circumstances_surrounding_crimes: Yup.string().required("moet dit veld invullen"),
  offenses_recations: Yup.string().required("moet dit veld invullen"),
};

export default function BehaviorOffensive({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"4. Delictgedrag"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Omschrijving van gepleegde delicten"
            className={"w-full"}
            id={"committed_offences_description"}
            required={true}
            type={"text"}
            value={values.committed_offences_description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.committed_offences_description && errors.committed_offences_description}
          />

          <InputField
            label="Frequentie en ernst van de delicten"
            className={"w-full"}
            id={"offences_frequency_seriousness"}
            required={true}
            type={"text"}
            value={values.offences_frequency_seriousness}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.offences_frequency_seriousness && errors.offences_frequency_seriousness}
          />
          <InputField
            label="Leeftijd van eerste delict"
            className={"w-full"}
            id={"age_first_offense"}
            required={true}
            type={"text"}
            value={values.age_first_offense}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.age_first_offense && errors.age_first_offense}
          />

          <InputField
            label="Context en omstandigheden rondom delicten"
            className={"w-full"}
            id={"circumstances_surrounding_crimes"}
            required={true}
            type={"text"}
            value={values.circumstances_surrounding_crimes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.circumstances_surrounding_crimes && errors.circumstances_surrounding_crimes
            }
          />
          <InputField
            label="Reactie van de jongere op de delicten (berouw, inzicht, etc.)"
            className={"w-full"}
            id={"offenses_recations"}
            required={true}
            type={"text"}
            value={values.offenses_recations}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.offenses_recations && errors.offenses_recations}
          />
        </div>
      </div>
    </Panel>
  );
}
