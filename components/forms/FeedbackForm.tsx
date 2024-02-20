"use client";

import * as Yup from "yup";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { NewFeedbackReqDto } from "@/types/feedback/new-feedback-req-dto";
import { useCreateFeedback } from "@/utils/feedback/createFeedback";
import Textarea from "../FormFields/Textarea";

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
  clientId: string;
};

export const FeedbackForm: FunctionComponent<PropsType> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateFeedback(parseInt(clientId));
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: () => {
          setIsSuccess(true);
          resetForm();
        },
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push(`/clients/${clientId}/reports-record/feedback`);
      }, 3000);
    }
  }, [isSuccess, router]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={feedbackSchema}
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
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
              loadingText={"Feedback Wordt Ingediend..."}
            >
              Feedback Indienen
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FeedbackForm;
