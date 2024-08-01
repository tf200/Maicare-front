"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { NewFeedbackReqDto } from "@/types/feedback/new-feedback-req-dto";
import { useCreateFeedback } from "@/utils/feedback/createFeedback";
import Textarea from "../FormFields/Textarea";
import { useGetFeedback } from "@/utils/feedback/getFeedback";
import { usePatchFeedback } from "@/utils/feedback/patchFeedback";

type FormType = NewFeedbackReqDto;

export type FeedbackFormType = FormType;

const initialValues: FormType = {
  feedback_text: "",
};

export const feedbackSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  date: Yup.string(),
  client: Yup.number(),
  feedback_text: Yup.string().required("Geef alstublieft uw feedback"),
});

type PropsType = {
  clientId: number;
  feedbackId?: number;
  mode: string;
};

export const FeedbackForm: FunctionComponent<PropsType> = ({ clientId, feedbackId, mode }) => {
  const router = useRouter();

  const { data, isLoading: isDataLoading, isError } = useGetFeedback(feedbackId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateFeedback(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchFeedback(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: feedbackId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/reports-record/feedback`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/reports-record/feedback`);
          },
        });
      }
    },
    [create, update]
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={mode == "edit" ? (data ? data : initialValues) : initialValues}
      onSubmit={onSubmit}
      validationSchema={feedbackSchema}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <Textarea
              className={"w-full mb-4.5"}
              id={"feedback"}
              name={"feedback_text"}
              rows={6}
              label={"Feedback"}
              placeholder={"Geef alstublieft feedback!"}
              value={values.feedback_text}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.feedback_text && errors.feedback_text}
              required={true}
            />

            <Button
              type={"submit"}
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Feedback bijwerken" : "Feedback indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FeedbackForm;
