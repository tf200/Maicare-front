import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const GeneralInfosInitialValue = {
  youngster_name: "",
  date_of_birth: "",
  gender: "",
  date_of_intake: "",
  intaker_position_name: "",
};

export const GeneralInfosShema = {
  youngster_name: Yup.string().required("moet dit veld invullen"),
  date_of_birth: Yup.string().required("moet dit veld invullen"),
  gender: Yup.string().required("moet dit veld invullen"),
  date_of_intake: Yup.string().required("moet dit veld invullen"),
  intaker_position_name: Yup.string().required("moet dit veld invullen"),
};

export default function GeneralInfos({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"1. Algemene Informatie"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Naam jongere"
            className={"w-full"}
            id={"youngster_name"}
            required={true}
            type={"text"}
            value={values.youngster_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.youngster_name && errors.youngster_name}
          />
          <div className="flex  gap-4">
            <InputField
              label="Geboortedatum"
              className={"w-1/2"}
              id={"date_of_birth"}
              required={true}
              type={"text"}
              value={values.date_of_birth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date_of_birth && errors.date_of_birth}
            />
            <InputField
              label="Geslacht"
              className={"w-1/2"}
              id={"gender"}
              required={true}
              type={"text"}
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.gender && errors.gender}
            />
          </div>
          <InputField
            label="Datum van intake"
            className={"w-full"}
            id={"date_of_intake"}
            required={true}
            type={"text"}
            value={values.date_of_intake}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.date_of_intake && errors.date_of_intake}
          />
          <InputField
            label="Naam en functie van de intaker"
            className={"w-full"}
            id={"intaker_position_name"}
            required={true}
            type={"text"}
            value={values.intaker_position_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.intaker_position_name && errors.intaker_position_name}
          />
        </div>
      </div>
    </Panel>
  );
}
