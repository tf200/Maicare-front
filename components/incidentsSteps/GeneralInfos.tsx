import React from "react";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import { INFORM_WHO_OPTIONS, REPORTER_INVOLVEMENT_OPTIONS } from "@/consts";
import * as Yup from "yup";
import Panel from "../Panel";
import { MultiCheckBoxInputField } from "../FormFields/MultiCheckBoxInputField";

export const GeneralInfosInitial = {
  employee_fullname: "",
  employee_position: "",
  location: "",
  reporter_involvement: "",
  incident_date: "",
  runtime_incident: "",
};

export const GeneralInfosShema = {
  employee_fullname: Yup.string().required(
    "Geef alstublieft de gerapporteerde datum."
  ),
  employee_position: Yup.string().required(
    "Geef alstublieft het tijdstip van het incident."
  ),
  location: Yup.string().required("Geef alstublieft de gerapporteerde datum."),
  reporter_involvement: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  follow_up_required: Yup.boolean().required(
    "Geef aan of er een Met maatregel:  is."
  ),
  runtime_incident: Yup.string().required(
    "Geef alstublieft de locatie van het incident111111"
  ),
  incident_date: Yup.string().required(
    "Geef alstublieft de locatie van het incident2222"
  ),
};

export default function GeneralInfos({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <Panel title={"1. Algemene informatie"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <InputField
          className={"w-full"}
          id={"employee_fullname"}
          required={true}
          label={"Naam betrokken medewerker(s)"}
          placeholder=""
          type={"text"}
          value={values.employee_fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employee_fullname && errors.employee_fullname}
        />
        <InputField
          className={"w-full"}
          id={"employee_position"}
          required={true}
          label={"functie betrokken medewerker(s)"}
          placeholder=""
          type={"text"}
          value={values.employee_position}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employee_position && errors.employee_position}
        />
        <InputField
          className={"w-full"}
          id={"location"}
          required={true}
          label={"Locatie zorgorganistie"}
          placeholder=""
          type={"text"}
          value={values.location}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.location && errors.location}
        />

        <Select
          label={"Betrokenheid melder"}
          name="reporter_involvement"
          id="reporter_involvement"
          value={values.reporter_involvement}
          className="w-full"
          required={true}
          options={REPORTER_INVOLVEMENT_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.reporter_involvement && errors.reporter_involvement}
        />
        <div className="flex flex-col ">
          <MultiCheckBoxInputField
            label="Wie moet geinformeerd worden?"
            selected={[]}
            options={INFORM_WHO_OPTIONS}
            name="inform_who"
          />
        </div>
        <InputField
          className={"w-full"}
          id={"incident_date"}
          required={true}
          label={"Datum ontstaan incident"}
          type={"date"}
          value={values.incident_date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.incident_date && errors.incident_date}
        />
        <InputField
          className={"w-full"}
          id={"runtime_incident"}
          required={true}
          label={"Runtime incident"}
          placeholder=""
          type={"text"}
          value={values.runtime_incident}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.runtime_incident && errors.runtime_incident}
        />
      </div>
    </Panel>
  );
}
