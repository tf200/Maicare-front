"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { Formik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { NewReportsReqDto } from "@/types/reports/new-reports-req-dto";
import { useCreateReports } from "@/utils/reports/createReports";

type FormType = NewReportsReqDto;

export type ReportsFormType = FormType;

const initialValues: FormType = {
  title: "",
  report_text: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  title: Yup.string().required("Please provide title "),
  report_text: Yup.string().required("Please provide report"),
  date: Yup.string(),
  client: Yup.number(),
  author: Yup.string(),
  id: Yup.number(),
});

type PropsType = {
  clientId: string;
};

export const ReportsForm: FunctionComponent<PropsType> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateReports(parseInt(clientId));
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
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <InputFieldThin
              className={"w-full mb-4.5"}
              required={true}
              id={"title"}
              label={"Title"}
              type={"text"}
              placeholder={"Enter title of the reports"}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && errors.title}
            />

            <Textarea
              rows={10}
              id={"report_text"}
              required={true}
              className={"mb-6"}
              label={"Reports"}
              placeholder={"Provide reports please"}
              value={values.report_text}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.report_text && errors.report_text}
            />

            <Button
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
              loadingText={"Submitting Reports..."}
            >
              Submit Diagnosis
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ReportsForm;
