import React, { useEffect, useState } from "react";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import { EMPTY_STRING, INFORM_WHO_OPTIONS, REPORTER_INVOLVEMENT_OPTIONS } from "@/consts";
import * as Yup from "yup";
import Panel from "../Panel";
import { MultiCheckBoxInputField } from "../FormFields/MultiCheckBoxInputField";
import { useLocations } from "@/utils/locations";

export const GeneralInfosInitial = {
  employee_fullname: "",
  employee_position: "",
  location_id: "",
  reporter_involvement: "",
  runtime_incident: "",
  incident_date: "",
  inform_who: [],
};

export const GeneralInfosShema = {
  employee_fullname: Yup.string().required("shouldn t be empty"),
  employee_position: Yup.string().required("shouldn t be empty"),
  location_id: Yup.number().required("shouldn t be empty"),
  reporter_involvement: Yup.string().required("shouldn t be empty"),
  runtime_incident: Yup.string().required("shouldn t be empty"),
  incident_date: Yup.string().required("shouldn t be empty"),
};

export default function GeneralInfos({ handleChange, values, handleBlur, touched, errors }) {
  const { data: locationLists, isLoading } = useLocations();
  const [locationOptions, setlocationOptions] = useState([]);

  useEffect(() => {
    if (!isLoading && locationLists) {
      const _options = [{ label: "Selecter locatie", value: "" }];
      locationLists.results.map((location) =>
        _options.push({
          label: `${location.name} - ${location.address}`,
          value: `${location.id}`,
        })
      );
      setlocationOptions(_options);
    }
  }, [isLoading]);

  return (
    <Panel title={"1. Algemene informatie"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <InputField
          className={"w-full"}
          id={"employee_fullname"}
          required={true}
          label={"Naam betrokken medewerker(s)"}
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
          type={"text"}
          value={values.employee_position}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employee_position && errors.employee_position}
        />
        <Select
          label={"Locatie zorgorganistie"}
          name="location_id"
          id={"location_id"}
          value={values.location_id}
          className="w-full"
          required={true}
          options={locationOptions}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.location_id && errors.location_id}
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
