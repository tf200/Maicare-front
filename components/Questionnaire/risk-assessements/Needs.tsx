import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const NeedsInitialValue = {
  specific_needs: "",
  risk_management_plan_of_actions: "",
  other_agencies_involvement: "",
  recommended_interventions: "",
};

export const NeedsShema = {
  specific_needs: Yup.string().required("moet dit veld invullen"),
  recommended_interventions: Yup.string().required("moet dit veld invullen"),
  risk_management_plan_of_actions: Yup.string().required("moet dit veld invullen"),
  other_agencies_involvement: Yup.string().required("moet dit veld invullen"),
};

export default function Needs({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"7. Behoeften en Aanbevelingen"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Specifieke behoeften van de jongere (psychologische hulp, onderwijsbegeleiding, etc.)"
            className={"w-full"}
            id={"specific_needs"}
            required={true}
            type={"text"}
            value={values.specific_needs}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.specific_needs && errors.specific_needs}
          />
          <InputField
            label="Aanbevolen interventies en programma’s:"
            className={"w-full"}
            id={"recommended_interventions"}
            required={true}
            type={"text"}
            value={values.recommended_interventions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.recommended_interventions && errors.recommended_interventions}
          />
          <InputField
            label="Betrokkenheid van andere instanties of professionals"
            className={"w-full"}
            id={"other_agencies_involvement"}
            required={true}
            type={"text"}
            value={values.other_agencies_involvement}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.other_agencies_involvement && errors.other_agencies_involvement}
          />
          <InputField
            label="Plan van aanpak voor risicobeheersing"
            className={"w-full"}
            id={"risk_management_plan_of_actions"}
            required={true}
            type={"text"}
            value={values.risk_management_plan_of_actions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.risk_management_plan_of_actions && errors.risk_management_plan_of_actions
            }
          />
        </div>
      </div>
    </Panel>
  );
}
