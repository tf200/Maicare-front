import React from "react";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import {
  CONSULTATION_NEEDED_OPTIONS,
  INJURY_OPTIONS,
  PSYCHOLOGICAL_DAMAGE_OPTIONS,
} from "@/consts";
import * as Yup from "yup";
import Panel from "../Panel";

export const ClientConsequencesShema = {
  employeeName: Yup.string().required("Geef alstublieft "),
  delete_involvement: Yup.string().required("Geef alstublieft ."),
};

export default function ClientConsequences({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <Panel title={"4. Gevolgen"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <label className="font-bold">Gevolgen cliënt</label>
        <Select
          label={"Lichamelijjk letsel"}
          name="delete_involvement"
          id="delete_involvement"
          value={values.delete_involvement || ""}
          className="w-full"
          required={true}
          options={INJURY_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.delete_involvement && errors.delete_involvement}
        />
        <InputField
          className={"w-full"}
          id={"employeeName"}
          required={true}
          placeholder=""
          type={"text"}
          value={values.employeeName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employeeName && errors.employeeName}
        />
        <Select
          label={"Psychische schade"}
          name="delete_involvet"
          id="delete_involvet"
          value={values.delete_involvement || ""}
          className="w-full"
          required={true}
          options={PSYCHOLOGICAL_DAMAGE_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.delete_involvement && errors.delete_involvement}
        />
        <InputField
          className={"w-full"}
          id={"employeeName"}
          required={true}
          placeholder=""
          type={"text"}
          value={values.employeeName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employeeName && errors.employeeName}
        />
        <Select
          label={"Psychische schade"}
          name="delete_involvem"
          id="delete_involveme"
          value={values.delete_involvement || ""}
          className="w-full"
          required={true}
          options={CONSULTATION_NEEDED_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.delete_involvement && errors.delete_involvement}
        />
      </div>
    </Panel>
  );
}
