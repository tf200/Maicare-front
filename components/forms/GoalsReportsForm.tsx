"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import RatingStars from "@/components/FormFields/RatingStars";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { NewGoalsReportReqDto } from "@/types/goalsReports/new-goalsReports-req-dto";
import { useCreateGoalReport } from "@/utils/goal-reports/createGoalReport";
import { useRouter } from "next/navigation";

type FormType = NewGoalsReportReqDto;

export type GoalsFormType = FormType;

const initialValues: FormType = {
  goal: 0,
  report_text: "",
  title: "",
  rating: 0,
  created_at: new Date().toISOString(),
};

export const goalsSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  goal: Yup.number(),
  report_text: Yup.string().required("Report text is required."),
  title: Yup.string().required("Title is required."),
  rating: Yup.number().required("Rating is required."),
  created_at: Yup.string(),
});

type PropsType = {
  clientId: number;
  goalId: number;
  className?: string;
};

export const GoalsForm: FunctionComponent<PropsType> = ({
  clientId,
  goalId,
  className,
}) => {
  const router = useRouter();

  const { mutate: create, isLoading: isCreating } =
    useCreateGoalReport(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      values.goal = goalId;
      create(values, {
        onSuccess: () => {
          resetForm;
          router.push(`/clients/${clientId}/goals/${goalId}/reports`);
        },
      });
    },
    [create]
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={goalsSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        handleSubmit,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className={className}>
          <div className="p-6.5">
            <InputField
              className={"w-full mb-4.5"}
              id={"created_at"}
              label={"Datum"}
              type={"date"}
              value={values.created_at}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.created_at && errors.created_at}
            />

            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"title"}
              label={"Titel"}
              type={"text"}
              placeholder={"Voer titel van het doel in"}
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
              label={"Report"}
              placeholder={"Voer rapport in"}
              value={values.report_text}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.report_text && errors.report_text}
            />

            <Button
              type={"submit"}
              disabled={isCreating}
              isLoading={isCreating}
              formNoValidate={true}
              loadingText={"Toevoegen..."}
            >
              {"Verzend rapport"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default GoalsForm;
