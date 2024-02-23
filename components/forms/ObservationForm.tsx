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
import Textarea from "../FormFields/Textarea";
import { useCreateObservation } from "@/utils/observations/createObservation";
import { NewObservationsReqDto } from "@/types/observations/new-observations-req-dto";
import InputField from "@/components/FormFields/InputField";

type FormType = NewObservationsReqDto;

export type ObservationFormType = FormType;

const initialValues: FormType = {
  observation_text: "",
  category: "",
};

export const feedbackSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  date: Yup.string(),
  client: Yup.number(),
  category: Yup.string().required("Geef alstublieft uw categorie"),
  observation_text: Yup.string().required("Geef alstublieft uw observatie"),
});

type PropsType = {
  clientId: string;
};

export const ObservationForm: FunctionComponent<PropsType> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateObservation(parseInt(clientId));
  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          router.push(`/clients/${clientId}/reports-record/observations`);
        },
      });
    },
    [mutate]
  );

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
              id={"observation_text"}
              name={"observation_text"}
              rows={6}
              label={"Observatie"}
              placeholder={"Geef alstublieft een observatie!"}
              value={values.observation_text}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.observation_text && errors.observation_text}
              required={true}
            />

            <InputField
              type={"text"}
              label={"Categorie"}
              id={"category"}
              placeholder={"Voer alstublieft een categorie in"}
              className="w-full mb-4.5"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.category && errors.category}
              required={true}
            />

            <Button
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
              loadingText={"Observatie Wordt Ingediend..."}
            >
              Observatie Indienen
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ObservationForm;
