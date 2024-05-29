import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const EvaluationInitialValue = {
  youngster_name: "",
  date_of_birth: "",
  intaker_position_name: "",
};

export const EvaluationShema = {
  youngster_name: Yup.string().required("moet dit veld invullen"),
  date_of_birth: Yup.string().required("moet dit veld invullen"),
  intaker_position_name: Yup.string().required("moet dit veld invullen"),
};

export default function Evaluation({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"9. Evaluatie en Monitoring"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Plan voor regelmatige evaluatie van de jongere"
            className={"w-full"}
            id={"youngster_name"}
            required={true}
            type={"text"}
            value={values.youngster_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.youngster_name && errors.youngster_name}
          />
          <InputField
            label="Criteria voor succes en voortgangsmetingen"
            className={"w-full"}
            id={"date_of_intake"}
            required={true}
            type={"text"}
            value={values.date_of_intake}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.date_of_intake && errors.date_of_intake}
          />
          <InputField
            label="Tijdschema voor evaluatiegesprekken"
            className={"w-full"}
            id={"intaker_position_name"}
            required={true}
            type={"text"}
            value={values.intaker_position_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.intaker_position_name && errors.intaker_position_name}
          />
        </div>
      </div>
    </Panel>
  );
}
