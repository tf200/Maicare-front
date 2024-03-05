"use client";

import React, { FunctionComponent, useCallback } from "react";
import { useCreateMedication } from "@/utils/medications/createMedication";
import { MedicationFormType } from "@/types/medications/medication-form-type";
import * as Yup from "yup";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import { useRouter } from "next/navigation";
import { useGetMedication } from "@/utils/medications/getMedication";
import { usePatchMedication } from "@/utils/medications/patchMedication";

const initialValues: MedicationFormType = {
  name: "",
  dosage: "",
  frequency: "",
  start_date: "",
  end_date: "",
  notes: "",
};

const medicationSchema: Yup.ObjectSchema<MedicationFormType> =
  Yup.object().shape({
    name: Yup.string().required("Geef alstublieft de medicatienaam op"),
    dosage: Yup.string().required("Geef alstublieft de dosering op"),
    frequency: Yup.string().required("Geef alstublieft de frequentie op"),
    start_date: Yup.string().required("Geef alstublieft de startdatum op"),
    end_date: Yup.string().required("Geef alstublieft de einddatum op"),
    notes: Yup.string().required("Geef alstublieft notities op"),
  });

type Props = {
  clientId: number;
  mode: string;
  medicationId?: number;
};

const MedicationForm: FunctionComponent<Props> = ({
  clientId,
  medicationId,
  mode,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetMedication(medicationId, clientId);

  const { mutate: create, isLoading: isCreating } =
    useCreateMedication(clientId);

  const { mutate: update, isLoading: isPatching } =
    usePatchMedication(clientId);

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: medicationId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/medical-record/medications`);
            },
          }
        );
      } else if (mode === "new") {
        create(
          { ...values, client: clientId },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/medical-record/medications`);
            },
          }
        );
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
      validationSchema={medicationSchema}
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
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"name"}
              label={"Naam van Medicatie"}
              type={"text"}
              placeholder={"Enter medication name"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
            />
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"dosage"}
              label={"Dosering"}
              type={"text"}
              placeholder={"Enter dosage"}
              value={values.dosage}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dosage && errors.dosage}
            />
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"frequency"}
              label={"Frequentie"}
              type={"text"}
              placeholder={"Enter frequency"}
              value={values.frequency}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.frequency && errors.frequency}
            />
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <InputField
                label={"Startdatum"}
                required={true}
                id={"start_date"}
                type={"date"}
                className="w-full xl:w-1/2"
                value={(values.start_date ?? "") + ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.start_date &&
                  errors.start_date &&
                  errors.start_date + ""
                }
              />
              <InputField
                className={"w-full xl:w-1/2"}
                id={"end_date"}
                required={true}
                type={"date"}
                label={"Einddatum"}
                value={(values.end_date ?? "") + ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.end_date && errors.end_date && errors.end_date + ""
                }
              />
            </div>
            <Textarea
              rows={6}
              id={"notes"}
              required={true}
              className={"mb-6"}
              label={"Notities bij Medicatie"}
              placeholder={"Please provide notes for this medication"}
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.notes && errors.notes}
            />

            <Button
              type={"submit"}
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Medicatie bijwerken" : "Medicatie indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MedicationForm;
