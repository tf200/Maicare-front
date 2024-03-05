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
import { usePatchObservation } from "@/utils/observations/patchObservation";
import { useGetObservation } from "@/utils/observations/getObservation";

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
  clientId: number;
  observationId?: number;
  mode: string;
};

export const ObservationForm: FunctionComponent<PropsType> = ({
  clientId,
  observationId,
  mode,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetObservation(observationId, clientId);

  const { mutate: create, isLoading: isCreating } =
    useCreateObservation(clientId);
  const { mutate: update, isLoading: isPatching } =
    usePatchObservation(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: observationId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/reports-record/observations`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/reports-record/observations`);
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
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Observatie bijwerken" : "Observatie indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ObservationForm;
