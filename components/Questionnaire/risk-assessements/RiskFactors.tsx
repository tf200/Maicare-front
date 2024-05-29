import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const RiskFactorsInitialValue = {
  personal_risk_factors: "",
  environmental_risk_factors: "",
  behaviour_recurrence_risk: "",
  abuse_substance_risk: "",
};

export const RiskFactorsShema = {
  personal_risk_factors: Yup.string().required("moet dit veld invullen"),
  environmental_risk_factors: Yup.string().required("moet dit veld invullen"),
  behaviour_recurrence_risk: Yup.string().required("moet dit veld invullen"),
  abuse_substance_risk: Yup.string().required("moet dit veld invullen"),
};

export default function RiskFactors({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"5. Risicofactoren"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Persoonlijke risicofactoren (impulsiviteit, agressie, etc.)"
            className={"w-full"}
            id={"personal_risk_factors"}
            required={true}
            type={"text"}
            value={values.personal_risk_factors}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.personal_risk_factors && errors.personal_risk_factors}
          />

          <InputField
            label="Omgevingsrisicofactoren (probleemgezinnen, slechte buurt, etc.)"
            className={"w-full"}
            id={"environmental_risk_factors"}
            required={true}
            type={"text"}
            value={values.environmental_risk_factors}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.environmental_risk_factors && errors.environmental_risk_factors}
          />
          <InputField
            label="Risico op herhaling van delictgedrag"
            className={"w-full"}
            id={"behaviour_recurrence_risk"}
            required={true}
            type={"text"}
            value={values.behaviour_recurrence_risk}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.behaviour_recurrence_risk && errors.behaviour_recurrence_risk}
          />

          <InputField
            label="Risico op middelenmisbruik"
            className={"w-full"}
            id={"date_of_intake"}
            required={true}
            type={"text"}
            value={values.date_of_intake}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.date_of_intake && errors.date_of_intake}
          />
        </div>
      </div>
    </Panel>
  );
}
