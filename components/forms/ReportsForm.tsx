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
import { usePatchReport } from "@/utils/reports/patchReport";
import { useGetReport } from "@/utils/reports/getReport";
import SmartTextarea from "@/components/FormFields/SmartTextarea";

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
  created: Yup.string().required("Gelieve de datum en tijd op te geven."),
});

type PropsType = {
  clientId: number;
  className?: string;
  mode: string;
  reportsId?: number;
};

export const ReportsForm: FunctionComponent<PropsType> = ({
  clientId,
  className,
  mode,
  reportsId,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetReport(reportsId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateReports(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchReport(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: reportsId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/reports-record/reports`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/reports-record/reports`);
          },
        });
      }
    },
    [create, update]
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        mode == "edit" ? (data ? data : initialValues) : initialValues
      }
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

            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"created"}
              label={"Datum en tijd"}
              type={"datetime-local"}
              placeholder={"Voer de titel van de rapporten in"}
              value={values.created}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.created && errors.created}
            />

            <SmartTextarea
              rows={10}
              id={"report_text"}
              name={"report_text"}
              modalTitle={"Rapporten verbeteren"}
              required={true}
              className={"mb-6"}
              label={"Rapporten"}
              placeholder={"Geef alstublieft rapporten"}
              error={touched.report_text && errors.report_text}
            />

            <Button
              type={"submit"}
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Rapport bijwerken" : "Rapport indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ReportsForm;
