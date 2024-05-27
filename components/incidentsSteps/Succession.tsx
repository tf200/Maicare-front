import React from "react";
import Panel from "../Panel";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import { EMPLOYEE_ABSENTEEISM_OPTIONS, ORGANIZATIONAL_OPTIONS } from "@/consts";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import Textarea from "../FormFields/Textarea";
import { MultiCheckBoxInputField } from "../FormFields/MultiCheckBoxInputField";
import * as Yup from "yup";

export const SuccessionInitital = {
  succession: [],
  succession_desc: "",
  other: false,
  other_desc: "",
  additional_appointments: "",
  employee_absenteeism: "",
};
export const SuccessionShema = {
  succession_desc: Yup.string().required("Shouldn't be empty"),
  other_desc: Yup.string().required("Shouldn't be empty"),
  employee_absenteeism: Yup.string().required("Shouldn't be empty"),
};

export default function Succession({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"5. Opvolging"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col ">
          <MultiCheckBoxInputField
            label="Opvolging"
            options={ORGANIZATIONAL_OPTIONS}
            name="succession"
          />
          <InputField
            className={"w-full"}
            id={"succession_desc"}
            required={true}
            type={"text"}
            value={values.succession_desc}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.succession_desc && errors.succession_desc}
          />
          <CheckBoxInputFieldThin
            label={"overige, nL."}
            className="my-3"
            name={"other"}
            id={"other"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.other}
          />
          <InputField
            className={"w-full"}
            id={"other_desc"}
            required={true}
            type={"text"}
            value={values.other_desc}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.other_desc && errors.other_desc}
          />
          <Textarea
            className="mb-4 col-span-2"
            rows={2}
            id={"additional_appointments"}
            label={"Aanvullende afspraken"}
            value={values.additional_appointments}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.additional_appointments}
          />
          <Select
            label={"Ziekteverzuim medewerker antwoord wissen"}
            name="employee_absenteeism"
            id="employee_absenteeism"
            value={values.employee_absenteeism}
            className="w-full"
            required={true}
            options={EMPLOYEE_ABSENTEEISM_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employee_absenteeism && errors.employee_absenteeism}
          />
        </div>
      </div>
    </Panel>
  );
}
