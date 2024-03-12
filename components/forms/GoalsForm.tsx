"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import RatingStars from "@/components/FormFields/RatingStars";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { NewGoalsReqDto } from "@/types/goals/new-goals-req-dto";
import { useCreateGoal } from "@/utils/goal/createGoal";
import { useRouter } from "next/navigation";
import { useGetGoal } from "@/utils/goal/getGoal";
import { usePatchGoal } from "@/utils/goal/patchGoal";

type FormType = NewGoalsReqDto;

export type GoalsFormType = FormType;

const initialValues: FormType = {
  goal_name: "",
  goal_details: "",
  report: "",
  rating: 0,
};

export const goalsSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  client: Yup.number(),
  goal_name: Yup.string().required("Geef alstublieft een titel"),
  goal_details: Yup.string().required("Geef alstublieft een omschrijving"),
  rating: Yup.number(),
  report: Yup.string(),
});

type PropsType = {
  clientId: number;
  className?: string;
  mode: string;
  goalId?: number;
};

export const GoalsForm: FunctionComponent<PropsType> = ({
  clientId,
  className,
  mode,
  goalId,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetGoal(goalId, clientId);
  
  const { mutate: create, isLoading: isCreating } = useCreateGoal(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchGoal(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      values.report = "";
      if (mode === "edit") {
        update(
          {
            ...values,
            id: goalId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/goals`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/goals`);
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
              required={true}
              id={"goal_name"}
              label={"Titel"}
              type={"text"}
              placeholder={"Voer titel van het doel in"}
              value={values.goal_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.goal_name && errors.goal_name}
            />

            <RatingStars
              label={"Beoordelen"}
              required={false}
              value={values.rating}
              onChange={(rate) => {
                setFieldValue("rating", rate);
              }}
            />

            <Textarea
              rows={10}
              id={"goal_details"}
              required={true}
              className={"mb-6"}
              label={"Omschrijving"}
              placeholder={"Geef alstublieft omschrijving"}
              value={values.goal_details}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.goal_details && errors.goal_details}
            />

            <Button
              type={"submit"}
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Doel bijwerken" : "Doel indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default GoalsForm;
