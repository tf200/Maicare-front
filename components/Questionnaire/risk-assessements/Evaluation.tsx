import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const EvaluationInitialValue = {
  regular_evaluation_plan: "",
  success_criteria: "",
  time_table: "",
};

export const EvaluationShema = {
  regular_evaluation_plan: Yup.string().required("moet dit veld invullen"),
  success_criteria: Yup.string().required("moet dit veld invullen"),
  time_table: Yup.string().required("moet dit veld invullen"),
};

export default function Evaluation({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"9. Evaluatie en Monitoring"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Plan voor regelmatige evaluatie van de jongere"
            className={"w-full"}
            id={"regular_evaluation_plan"}
            required={true}
            type={"text"}
            value={values.regular_evaluation_plan}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.regular_evaluation_plan && errors.regular_evaluation_plan}
          />
          <InputField
            label="Criteria voor succes en voortgangsmetingen"
            className={"w-full"}
            id={"success_criteria"}
            required={true}
            type={"text"}
            value={values.success_criteria}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.success_criteria && errors.success_criteria}
          />
          <InputField
            label="Tijdschema voor evaluatiegesprekken"
            className={"w-full"}
            id={"time_table"}
            required={true}
            type={"text"}
            value={values.time_table}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.time_table && errors.time_table}
          />
        </div>
      </div>
    </Panel>
  );
}
