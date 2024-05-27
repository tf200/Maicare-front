import React from "react";
import Panel from "../Panel";
import InputField from "../FormFields/InputField";
import Textarea from "../FormFields/Textarea";
import * as Yup from "yup";
import { MultiCheckBoxInputField } from "../FormFields/MultiCheckBoxInputField";
import {
  CLIENT_OPTIONS,
  EMPTY_STRING,
  MESE_WORKER_OPTIONS,
  ORGANIZATIONAL_OPTIONS,
  TECHNICAL_OPTIONS,
} from "@/consts";

export const AnalysisInitial = {
  other_cause: "",
  technical: [],
  organizational: [],
  mese_worker: [],
  client_options: [],
  cause_explanation: "",
};

export const AnalysisShema = {
  other_cause: Yup.string().required("Selecteer minstens één betrokken kind."),
};

export default function Analysis({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"3. Mogelijke oorzaak en toelichting"}>
      <div className="mb-4.5 mt-4.5 grid grid-cols-2 gap-6 px-6.5">
        <div className="flex flex-col ">
          <MultiCheckBoxInputField label="Technisch" options={TECHNICAL_OPTIONS} name="technical" />
        </div>
        <div className="flex flex-col ">
          <MultiCheckBoxInputField
            label="Organisatorish"
            options={ORGANIZATIONAL_OPTIONS}
            name="organizational"
          />
        </div>
        <div className="flex flex-col ">
          <MultiCheckBoxInputField
            label="Mesewerker"
            options={MESE_WORKER_OPTIONS}
            name="mese_worker"
          />
        </div>
        <div className="flex flex-col ">
          <MultiCheckBoxInputField label="Cliënt" options={CLIENT_OPTIONS} name="client_options" />
        </div>
        <InputField
          className={"col-span-2"}
          id={"other_cause"}
          required={true}
          label={"Overig"}
          type={"text"}
          value={values.other_cause}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.other_cause && errors.other_cause}
        />
        <Textarea
          className="mb-4 col-span-2"
          rows={2}
          id={"cause_explanation"}
          label={"Toelichting op de oorzaak/oorzaken"}
          value={values.cause_explanation || EMPTY_STRING}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.cause_explanation}
        />
      </div>
    </Panel>
  );
}
