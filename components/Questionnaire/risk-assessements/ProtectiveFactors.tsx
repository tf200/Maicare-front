import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const ProtectiveFactorsInitialValue = {
  person_strengths: "",
  positive_influences: "",
  available_support_assistance: "",
  person_strategies: "",
};

export const ProtectiveFactorsShema = {
  person_strengths: Yup.string().required("moet dit veld invullen"),
  positive_influences: Yup.string().required("moet dit veld invullen"),
  available_support_assistance: Yup.string().required("moet dit veld invullen"),
  person_strategies: Yup.string().required("moet dit veld invullen"),
};

export default function ProtectiveFactors({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"6. Beschermende Factoren"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Sterke punten van de jongere"
            className={"w-full"}
            id={"person_strengths"}
            required={true}
            type={"text"}
            value={values.person_strengths}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.person_strengths && errors.person_strengths}
          />

          <InputField
            label="Positieve invloeden in het leven van de jongere"
            className={"w-full"}
            id={"positive_influences"}
            required={true}
            type={"text"}
            value={values.positive_influences}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.positive_influences && errors.positive_influences}
          />
          <InputField
            label="Beschikbare ondersteunende diensten en hulpverlening"
            className={"w-full"}
            id={"available_support_assistance"}
            required={true}
            type={"text"}
            value={values.available_support_assistance}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.available_support_assistance && errors.available_support_assistance}
          />

          <InputField
            label="Copingstrategieën van de jongere"
            className={"w-full"}
            id={"person_strategies"}
            required={true}
            type={"text"}
            value={values.person_strategies}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.person_strategies && errors.person_strategies}
          />
        </div>
      </div>
    </Panel>
  );
}
