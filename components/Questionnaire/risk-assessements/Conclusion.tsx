import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import React from "react";
import * as Yup from "yup";

export const ConclusionInitialValue = {
  findings_summary: "",
  institution_advice: "",
  inclusion: "",
  intaker_name: "",
  report_date: "",
};

export const ConclusionShema = {
  findings_summary: Yup.string().required("moet dit veld invullen"),
  institution_advice: Yup.string().required("moet dit veld invullen"),
  inclusion: Yup.string().required("moet dit veld invullen"),
  intaker_name: Yup.string().required("moet dit veld invullen"),
  report_date: Yup.string().required("moet dit veld invullen"),
};

export default function Conclusion({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"8. Conclusie en Advies"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Samenvatting van bevindingen"
            className={"w-full"}
            id={"findings_summary"}
            required={true}
            type={"text"}
            value={values.findings_summary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.findings_summary && errors.findings_summary}
          />

          <InputField
            label="Advies over opname in de instelling"
            className={"w-full"}
            id={"institution_advice"}
            required={true}
            type={"text"}
            value={values.institution_advice}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.institution_advice && errors.institution_advice}
          />
          <InputField
            label="Eventuele voorwaarden of aandachtspunten voor opname"
            className={"w-full"}
            id={"inclusion"}
            required={true}
            type={"text"}
            value={values.inclusion}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.inclusion && errors.inclusion}
          />

          <InputField
            label="Naam en handtekening van de intaker"
            className={"w-full"}
            id={"intaker_name"}
            required={true}
            type={"text"}
            value={values.intaker_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.intaker_name && errors.intaker_name}
          />
          <InputField
            label="Datum van rapportage"
            className={"w-full"}
            id={"report_date"}
            required={true}
            type={"text"}
            value={values.report_date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.report_date && errors.report_date}
          />
        </div>
      </div>
    </Panel>
  );
}
