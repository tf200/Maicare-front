"use client";

import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { DIAGNOSIS_SEVERITY_OPTIONS } from "@/consts";
import Textarea from "@/components/FormFields/Textarea";
import { Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { NewDiagnosisRequest } from "@/types/dto/new-diagnosis-request";
import * as Yup from "yup";

const NewDiagnostic: FunctionComponent = (props) => {
  return (
    <>
      <Breadcrumb pageName="New Diagnosis" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Diagnosis Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create a New Diagnosis
              </h3>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDiagnostic;

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

const Form: FunctionComponent = () => {
  const params = useSearchParams();
  const clientId = params.get("clientId");
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={console.log}
      validationSchema={newDiagnosisSchema}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <InputFieldThin
              className={"w-full mb-4.5"}
              required={true}
              id={"diagnosis_summary"}
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
