"use client";

import React, { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik/dist/types";
import { EpisodeFormType } from "@/types/episodes/episode-form-type";
import { useCreateEpisode } from "@/utils/episodes/createEpisode";

const initialValues: EpisodeFormType = {
  date: "",
  state_description: "",
  intensity: undefined,
};

const episodeSchema: Yup.ObjectSchema<EpisodeFormType> = Yup.object().shape({
  date: Yup.string().required("Geef alstublieft een datum voor de episode"),
  state_description: Yup.string().required(
    "Geef alstublieft een beschrijving voor de episode"
  ),
  intensity: Yup.number().required(
    "Geef alstublieft de intensiteit van de episode van 1 tot 10"
  ),
});

type Props = {
  clientId: number;
};

const EpisodeForm: FunctionComponent<Props> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateEpisode(clientId);
  const router = useRouter();
  const onSubmit = (
    values: EpisodeFormType,
    { resetForm }: FormikHelpers<EpisodeFormType>
  ) => {
    mutate(
      {
        ...values,
        client: clientId,
      },
      {
        onSuccess: () => {
          resetForm();
          router.push(`/clients/${clientId}/medical-record/episodes`);
        },
      }
    );
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={episodeSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputField
              className={"w-full xl:w-1/2"}
              id={"intensity"}
              required={true}
              label={"Intensiteit"}
              type={"number"}
              min={1}
              max={10}
              step={1}
              placeholder={"Geef de intensiteit van de episode van 1 tot 10"}
              value={values.intensity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.intensity && errors.intensity}
            />
            <InputField
              className={"w-full xl:w-1/2"}
              id={"date"}
              required={true}
              label={"Datum"}
              type={"date"}
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date && errors.date}
            />
          </div>
          <Textarea
            rows={6}
            id={"state_description"}
            required={true}
            className={"mb-6"}
            label={"Beschrijving van de Episode"}
            placeholder={"Voer hier een beschrijving van de episode in..."}
            value={values.state_description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.state_description && errors.state_description}
          />

          <Button
            type={"submit"}
            disabled={isLoading}
            isLoading={isLoading}
            formNoValidate={true}
            loadingText={"Bezig met Indienen van Geregistreerde Episode..."}
          >
            Episode Registreren
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default EpisodeForm;
