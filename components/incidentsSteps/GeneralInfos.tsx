import React from "react";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import { REPORTER_INVOLVEMENT_OPTIONS } from "@/consts";
import * as Yup from "yup";
import Panel from "../Panel";

export const GeneralInfosInitial = {
  employeeName: "",
  employeePosition: "",
  healthcarePosition: "",
  delete_involvement: "",
  date_of_incident2: "",
  runtimeIncident: "",
};

export const GeneralInfosShema = {
  employeeName: Yup.string().required(
    "Geef alstublieft de gerapporteerde datum."
  ),
  employeePosition: Yup.string().required(
    "Geef alstublieft het tijdstip van het incident."
  ),
  healthcarePosition: Yup.string().required(
    "Geef alstublieft de gerapporteerde datum."
  ),
  delete_involvement: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  follow_up_required: Yup.boolean().required(
    "Geef aan of er een Met maatregel:  is."
  ),
  runtimeIncident: Yup.string().required(
    "Geef alstublieft de locatie van het incident111111"
  ),
  date_of_incident2: Yup.string().required(
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
        <InputField
          className={"w-full"}
          id={"employeePosition"}
          required={true}
          label={"functie betrokken medewerker(s)"}
          placeholder=""
          type={"text"}
          value={values.employeePosition}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employeePosition && errors.employeePosition}
        />
        <InputField
          className={"w-full"}
          id={"healthcarePosition"}
          required={true}
          label={"Locatie zorgorganistie"}
          placeholder=""
          type={"text"}
          value={values.healthcarePosition}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.healthcarePosition && errors.healthcarePosition}
        />

        <Select
          label={"Betrokenheid melder"}
          name="delete_involvement"
          id="delete_involvement"
          value={values.delete_involvement}
          className="w-full"
          required={true}
          options={REPORTER_INVOLVEMENT_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.delete_involvement && errors.delete_involvement}
        />
        <div className="flex flex-col ">
          <label className="mb-4 block text-black dark:text-white">
            Wie moet geinformeerd worden?<span className="text-meta-1">*</span>
          </label>
          <CheckBoxInputFieldThin
            label={"Met maatregel: jeugdbeschermer"}
            className="mb-3"
            name={"checkbox1"}
            id={"checkbox1"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox1 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: jeugdreclasseerder"}
            className="mb-3"
            name={"checkbox2"}
            id={"checkbox2"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox2 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: voogd"}
            className="mb-3"
            name={"checkbox3"}
            id={"checkbox3"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox3 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: gezaghebbende ouders"}
            className="mb-3"
            name={"checkbox4"}
            id={"checkbox4"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox4 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: ouders"}
            className="mb-3"
            name={"checkbox5"}
            id={"checkbox5"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox5 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: mentor"}
            className="mb-3"
            name={"checkbox6"}
            id={"checkbox6"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox6 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: PGB vertegenwoordiger"}
            className="mb-3"
            name={"checkbox7"}
            id={"checkbox7"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox7 || false}
          />
          <CheckBoxInputFieldThin
            label={"Met maatregel: niemad (ZIN / 18+)."}
            className="mb-3"
            name={"checkbox8"}
            id={"checkbox8"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox8 || false}
          />
        </div>
        <InputField
          className={"w-full"}
          id={"date_of_incident2"}
          required={true}
          label={"Datum ontstaan incident"}
          type={"date"}
          value={values.date_of_incident2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.date_of_incident2 && errors.date_of_incident2}
        />
        <InputField
          className={"w-full"}
          id={"runtimeIncident"}
          required={true}
          label={"Runtime incident"}
          placeholder=""
          type={"text"}
          value={values.runtimeIncident}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.runtimeIncident && errors.runtimeIncident}
        />
      </div>
    </Panel>
  );
}
