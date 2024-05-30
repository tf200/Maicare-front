import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const BackgroundInitialValue = {
  family_situation: "",
  education_work: "",
  current_living_situation: "",
  social_network: "",
  previous_assistance: "",
};

export const BackgroundShema = {
  family_situation: Yup.string().required("moet dit veld invullen"),
  education_work: Yup.string().required("moet dit veld invullen"),
  current_living_situation: Yup.string().required("moet dit veld invullen"),
  social_network: Yup.string().required("moet dit veld invullen"),
  previous_assistance: Yup.string().required("moet dit veld invullen"),
};

export default function Background({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"2. Achtergrondinformatie"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Gezinssituatie"
            className={"w-full"}
            id={"family_situation"}
            required={true}
            type={"text"}
            value={values.family_situation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.family_situation && errors.family_situation}
          />
          <div className="flex  gap-4">
            <InputField
              label="Onderwijs/werk"
              className={"w-1/2"}
              id={"education_work"}
              required={true}
              type={"text"}
              value={values.education_work}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.education_work && errors.education_work}
            />
            <InputField
              label="Huidige woonsituatie"
              className={"w-1/2"}
              id={"current_living_situation"}
              required={true}
              type={"text"}
              value={values.current_living_situation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.current_living_situation && errors.current_living_situation}
            />
          </div>
          <InputField
            label="Sociale netwerk"
            className={"w-full"}
            id={"social_network"}
            required={true}
            type={"text"}
            value={values.social_network}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.social_network && errors.social_network}
          />
          <InputField
            label="Eventuele eerdere hulpverlening"
            className={"w-full"}
            id={"previous_assistance"}
            required={true}
            type={"text"}
            value={values.previous_assistance}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.previous_assistance && errors.previous_assistance}
          />
        </div>
      </div>
    </Panel>
  );
}
