"use client";

import * as Yup from "yup";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { NewReportsReqDto } from "@/types/reports/new-reports-req-dto";
import { useCreateReports } from "@/utils/reports/createReports";
import { useRouter } from "next/navigation";

type FormType = NewReportsReqDto;

export type ReportsFormType = FormType;

const initialValues: FormType = {
  title: "",
  report_text: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  title: Yup.string().required("Geef alstublieft een titel"),
  report_text: Yup.string().required("Geef alstublieft een rapport"),
  date: Yup.string(),
  client: Yup.number(),
  author: Yup.string(),
  id: Yup.number(),
});

type PropsType = {
  clientId: number;
  className?: string;
};

export const ReportsForm: FunctionComponent<PropsType> = ({
  clientId,
  className,
}) => {
  const { mutate, isLoading } = useCreateReports(clientId);
  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          router.push(`/clients/${clientId}/reports-record/reports`);
        },
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
        <form onSubmit={handleSubmit} className={className}>
          <div className="p-6.5">
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"title"}
              label={"Titel"}
              type={"text"}
              placeholder={"Voer de titel van de rapporten in"}
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
              label={"Rapporten"}
              placeholder={"Geef alstublieft rapporten"}
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
              loadingText={"Rapporten Worden Ingediend..."}
            >
              Rapport Indienen
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ReportsForm;
