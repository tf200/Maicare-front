import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const BehaviorStatusInitialValue = {
  behaviour_at_school_work: "",
  people_skills: "",
  emotional_status: "",
  self_image_self_confidence: "",
  stress_factors: "",
};

export const BehaviorStatusShema = {
  behaviour_at_school_work: Yup.string().required("moet dit veld invullen"),
  people_skills: Yup.string().required("moet dit veld invullen"),
  emotional_status: Yup.string().required("moet dit veld invullen"),
  self_image_self_confidence: Yup.string().required("moet dit veld invullen"),
  stress_factors: Yup.string().required("moet dit veld invullen"),
};

export default function BehaviorStatus({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"3. Gedrag en Psychosociale Status"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Gedrag op school/werk"
            className={"w-full"}
            id={"behaviour_at_school_work"}
            required={true}
            type={"text"}
            value={values.behaviour_at_school_work}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.behaviour_at_school_work && errors.behaviour_at_school_work}
          />

          <InputField
            label="Sociale vaardigheden"
            className={"w-full"}
            id={"people_skills"}
            required={true}
            type={"text"}
            value={values.people_skills}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.people_skills && errors.people_skills}
          />
          <InputField
            label="Emotionele status (angst, depressie, etc.)"
            className={"w-full"}
            id={"emotional_status"}
            required={true}
            type={"text"}
            value={values.emotional_status}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.emotional_status && errors.emotional_status}
          />

          <div className="flex  gap-4">
            <InputField
              label="Zelfbeeld en zelfvertrouwen"
              className={"w-1/2"}
              id={"self_image_self_confidence"}
              required={true}
              type={"text"}
              value={values.self_image_self_confidence}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.self_image_self_confidence && errors.self_image_self_confidence}
            />
            <InputField
              label="Stressfactoren"
              className={"w-1/2"}
              id={"stress_factors"}
              required={true}
              type={"text"}
              value={values.stress_factors}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.stress_factors && errors.stress_factors}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
