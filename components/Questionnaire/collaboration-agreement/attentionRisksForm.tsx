"use client";
import React from "react";
import { FieldArray } from "formik";
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
      explanation: "",
    },
  ],
};

export const AttentionRisksSchema = {
  attention_risks: Yup.array()
    .of(
      Yup.object()
        .shape({
          type: Yup.string(),
          attention: Yup.string(),
          risk: Yup.string(),
          positive: Yup.string(),
          dates: Yup.string(),
          explanation: Yup.string(),
        })
        .required()
    )
    .min(1, "Should fill at least one item")
    .required(),
};

export default function AttentionRisksForm({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"4. Aandacht en risico's"}>
      <FieldArray name="attention_risks">
        {(field) => {
          return (
            <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
              {values.attention_risks.length > 0 &&
                values.attention_risks.map((risk, index) => (
                  <div key={index} className="flex flex-col gap-4 p-4">
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
                        onClick={() => field.remove(index)}
                        disabled={values.attention_risks.length === 1}
                      >
                        Verwijderen
                      </Button>
                    )}
                  </div>
                ))}

              <Button
                type="button"
                className="bg-primary"
                onClick={() =>
                  field.push({
                    type: "",
                    attention: "",
                    risk: "",
                    positive: "",
                    dates: "",
                    explanation: "",
                  })
                }
              >
                Nieuw risicotype toevoegen
              </Button>
            </div>
          );
        }}
      </FieldArray>

      <p className="text-red">{touched.attention_risks && errors.attention_risks}</p>
    </Panel>
  );
}
