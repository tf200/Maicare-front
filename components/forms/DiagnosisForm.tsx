"use client";

import { NewDiagnosisRequest } from "@/types/dto/new-diagnosis-request";
import * as Yup from "yup";
import React, { FunctionComponent } from "react";
import { Formik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { DIAGNOSIS_SEVERITY_OPTIONS } from "@/consts";
import Textarea from "@/components/FormFields/Textarea";

type FormType = Omit<
  NewDiagnosisRequest,
  "client" | "severity" | "date_of_diagnosis" | "diagnosing_clinician"
> & {
  severity: string;
};

const initialValues: FormType = {
  title: "",
  condition: "",
  diagnosis_code: "",
  severity: "",
  status: "",
  notes: "",
};

const newDiagnosisSchema = Yup.object().shape({
  title: Yup.string().required("Please provide diagnosis summary"),
  condition: Yup.string().required("Please provide condition of the patient"),
  diagnosis_code: Yup.string().required("Please provide diagnosis code"),
  severity: Yup.string().required("Please provide severity of the diagnosis"),
  status: Yup.string().required("Please provide status of the diagnosis"),
  notes: Yup.string().required("Please provide notes for the diagnosis"),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FormComponentType = {
  clientId: string;
};

export const DiagnosisForm: FunctionComponent<FormComponentType> = ({
  clientId,
}) => {
  console.log("clientId", clientId);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        const data: NewDiagnosisRequest = {
          ...values,
          severity: "Mild",
          client: parseInt(clientId),
          diagnosing_clinician: "DUMMY DATA",
          date_of_diagnosis: new Date().toISOString().split("T")[0],
        };
        const tempData = { ...data, description: data.notes };
        delete tempData.condition;
        const response = await fetch(`${API_URL}/client/diagnosis_create`, {
          method: "POST",
          body: JSON.stringify(tempData),
        });
        if (response.ok) {
          console.log("Diagnosis created successfully", await response.json());
        }
      }}
      validationSchema={newDiagnosisSchema}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <InputFieldThin
              className={"w-full mb-4.5"}
              required={true}
              id={"title"}
              label={"Diagnosis summary"}
              type={"text"}
              placeholder={"Enter summary of the diagnosis"}
              value={values.title}
              onChange={handleChange}
            />
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <InputFieldThin
                label={"Condition"}
                id={"condition"}
                required={true}
                placeholder={"Enter Condition of the patient"}
                type={"text"}
                className="w-full xl:w-1/2"
                value={values.condition}
                onChange={handleChange}
              />
              <InputFieldThin
                className={"w-full xl:w-1/2"}
                id={"diagnosis_code"}
                required={true}
                label={"ICD Code"}
                type={"text"}
                placeholder={"Enter ICD Code of the diagnosis"}
                value={values.diagnosis_code}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <Select
                label={"Severity"}
                id={"severity"}
                options={DIAGNOSIS_SEVERITY_OPTIONS}
                className="w-full xl:w-1/2"
                required={true}
                value={values.severity}
                onChange={handleChange}
              />
              <InputFieldThin
                className={"w-full xl:w-1/2"}
                id={"status"}
                required={true}
                label={"Status"}
                type={"text"}
                placeholder={"Enter current status of the patient"}
                value={values.status}
                onChange={handleChange}
              />
            </div>

            <Textarea
              rows={6}
              id={"notes"}
              className={"mb-6"}
              label={"Diagnosis Notes"}
              placeholder={"Provide notes for the diagnosis"}
              value={values.notes}
              onChange={handleChange}
            />

            <button
              type={"submit"}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              Submit Diagnostic
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DiagnosisForm;
