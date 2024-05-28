import React from "react";
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Panel from "@/components/Panel";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";
import { ATTENTION_RISKS_OPTIONS } from "@/consts";

export const AttentionRisksInitialValue = {
  attention_risks: [
    {
      type: "",
      attention: "",
      risk: "",
      positive: "",
      dates: "",
      explanation: "",
    },
  ],
};

export const AttentionRisksSchema = Yup.object().shape({
  attention_risks: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required("Type is required"),
        attention: Yup.string().required("Attention is required"),
        risk: Yup.string().required("Risk is required"),
        positive: Yup.string().required("Positive is required"),
        dates: Yup.string().required("Dates are required"),
        explanation: Yup.string().required("Explanation is required"),
      })
    )
    .min(1, "Should fill at least one item"),
});

export default function AttentionRisksForm() {
  return (
    <Formik
      initialValues={AttentionRisksInitialValue}
      validationSchema={AttentionRisksSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <Panel title={"4. Aandacht en risico's"}>
            <FieldArray name="attention_risks">
              {({ insert, remove, push }) => (
                <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
                  {values.attention_risks.length > 0 &&
                    values.attention_risks.map((risk, index) => (
                      <div key={index} className="flex flex-col gap-4  p-4">
                        <Select
                          label={"Betrokkenheid melder"}
                          name={`attention_risks.${index}.type`}
                          id={`attention_risks.${index}.type`}
                          value={risk.type}
                          className="w-full"
                          required={true}
                          options={ATTENTION_RISKS_OPTIONS}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            label="Aandacht"
                            className={"w-full"}
                            id={`attention_risks.${index}.attention`}
                            required={true}
                            type={"text"}
                            value={risk.attention}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <InputField
                            label="Risico"
                            className={"w-full"}
                            id={`attention_risks.${index}.risk`}
                            required={true}
                            type={"text"}
                            value={risk.risk}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <InputField
                            label="Positief"
                            className={"w-full"}
                            id={`attention_risks.${index}.positive`}
                            required={true}
                            type={"text"}
                            value={risk.positive}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <InputField
                            label="Afspraken"
                            className={"w-full"}
                            id={`attention_risks.${index}.dates`}
                            required={true}
                            type={"text"}
                            value={risk.dates}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <Textarea
                          label="Toelichting"
                          className={"w-full"}
                          id={`attention_risks.${index}.explanation`}
                          required={true}
                          value={risk.explanation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {values.attention_risks.length > 1 && (
                          <Button
                            type="button"
                            className="bg-red w-1/4"
                            onClick={() => remove(index)}
                            disabled={values.attention_risks.length === 1}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    ))}
                  <Button
                    type="button"
                    className="bg-primary"
                    onClick={() =>
                      push({
                        type: "",
                        attention: "",
                        risk: "",
                        positive: "",
                        dates: "",
                        explanation: "",
                      })
                    }
                  >
                    Add new risk type
                  </Button>
                </div>
              )}
            </FieldArray>
            <p className="text-red">{touched.attention_risks && errors.attention_risks}</p>
          </Panel>
        </form>
      )}
    </Formik>
  );
}
