"use client";

import { NewDiagnosisRequest } from "@/types/dto/new-diagnosis-request";
import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { Formik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { DIAGNOSIS_SEVERITY_ARRAY, DIAGNOSIS_SEVERITY_OPTIONS } from "@/consts";
import Textarea from "@/components/FormFields/Textarea";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { useCreateDiagnosis } from "@/utils/diagnosis/createDiagnosis";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";

type FormType = Omit<
  NewDiagnosisRequest,
  "client" | "severity" | "date_of_diagnosis" | "diagnosing_clinician"
> & {
  severity: DiagnosisSeverity | "";
};

export type DiagnosisFormType = FormType;

const initialValues: FormType = {
  title: "",
  description: "",
  diagnosis_code: "",
  severity: "",
  status: "",
  notes: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  title: Yup.string().required("Please provide diagnosis summary"),
  description: Yup.string().required("Please provide condition of the patient"),
  diagnosis_code: Yup.string().required("Please provide diagnosis code"),
  severity: Yup.string()
    .oneOf(DIAGNOSIS_SEVERITY_ARRAY, "Please select a valid severity")
    .required("Please provide severity of the diagnosis"),
  status: Yup.string().required("Please provide status of the diagnosis"),
  notes: Yup.string().required("Please provide notes for the diagnosis"),
});

type PropsType = {
  clientId: string;
};

export const DiagnosisForm: FunctionComponent<PropsType> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateDiagnosis(
    parseInt(clientId),
    "mock-clinician"
  );
  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: resetForm,
      });
    },
    [mutate]
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={diagnosisSchema}
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
                id={"description"}
                required={true}
                placeholder={"Enter Condition of the patient"}
                type={"text"}
                className="w-full xl:w-1/2"
                value={values.description}
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

            <Button type={"submit"} disabled={isLoading} isLoading={isLoading}>
              Submit Diagnosis
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DiagnosisForm;
