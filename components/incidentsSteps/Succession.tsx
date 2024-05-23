import React from "react";
import Panel from "../Panel";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import { EMPLOYEE_ABSENTEEISM_OPTIONS } from "@/consts";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import Textarea from "../FormFields/Textarea";

export default function Succession({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <Panel title={"5. Opvolging"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <InputField
          className={"w-full"}
          id={"employeeName"}
          required={true}
          label={"Naam betrokken medewerker(s)"}
          placeholder=""
          type={"text"}
          value={values.employeeName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employeeName && errors.employeeName}
        />
        <div className="flex flex-col ">
          <label className="mb-4 block text-black dark:text-white">
            Opvolging
          </label>
          <CheckBoxInputFieldThin
            label={"Besproken met betrokken medewerker(s)"}
            className="mb-3"
            name={"checkbox1"}
            id={"checkbox1"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox1 || false}
          />
          <CheckBoxInputFieldThin
            label={"Besproken in teamvergadering"}
            className="mb-3"
            name={"checkbox2"}
            id={"checkbox2"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox2 || false}
          />
          <CheckBoxInputFieldThin
            label={"Besproken met betrokken client"}
            className="mb-3"
            name={"checkbox3"}
            id={"checkbox3"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox3 || false}
          />
          <CheckBoxInputFieldThin
            label={"Terugkoppeling gedaan naar melder"}
            className="mb-3"
            name={"checkbox4"}
            id={"checkbox4"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox4 || false}
          />
          <CheckBoxInputFieldThin
            label={"Besproken met MT"}
            className="mb-3"
            name={"checkbox5"}
            id={"checkbox5"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox5 || false}
          />
          <CheckBoxInputFieldThin
            label={"Besproken met overige betrokkenen, nl.:"}
            className="mb-3"
            name={"checkbox6"}
            id={"checkbox6"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox6 || false}
          />
          <InputField
            className={"w-full"}
            id={"runtimeIncident"}
            required={true}
            placeholder=""
            type={"text"}
            value={values.runtimeIncident}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.runtimeIncident && errors.runtimeIncident}
          />
          <CheckBoxInputFieldThin
            label={"overige, nL."}
            className="my-3"
            name={"checkbox7"}
            id={"checkbox7"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox7 || false}
          />
          <InputField
            className={"w-full"}
            id={"runtimeIncident"}
            required={true}
            placeholder=""
            type={"text"}
            value={values.runtimeIncident}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.runtimeIncident && errors.runtimeIncident}
          />
          <Textarea
            className="mb-4 col-span-2"
            rows={2}
            id={"textArea2"}
            required={true}
            label={"Aanvullende afspraken"}
            value={values.textArea || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.textArea2 && errors.textArea2}
          />
          <Select
            label={"Ziekteverzuim medewerker antwoord wissen"}
            name="delete_involvement"
            id="delete_involvement"
            value={values.delete_involvement || ""}
            className="w-full"
            required={true}
            options={EMPLOYEE_ABSENTEEISM_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.delete_involvement && errors.delete_involvement}
          />
        </div>
      </div>
    </Panel>
  );
}
