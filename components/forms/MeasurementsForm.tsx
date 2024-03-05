"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useCreateMeasurement } from "@/utils/measurement/createMeasurement";
import { MeasurmentResDto } from "@/types/measurment/measurment-res-dto";
import { usePatchMeasurement } from "@/utils/measurement/patchMeasurement";
import { useGetMeasurement } from "@/utils/measurement/getMeasurement";

type FormType = MeasurmentResDto;

export type MeasurementFormType = FormType;

const initialValues: FormType = {
  value: 0,
  measurement_type: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  date: Yup.string(),
  client: Yup.number(),
  value: Yup.number().required("Geef alstublieft een waarde"),
  measurement_type: Yup.string().required("Geef alstublieft een type"),
});

type PropsType = {
  clientId: number;
  measurementsId?: number;
  mode: string;
};

export const MeasurementsForm: FunctionComponent<PropsType> = ({
  clientId,
  measurementsId,
  mode,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetMeasurement(measurementsId, clientId);

  const { mutate: create, isLoading: isCreating } =
    useCreateMeasurement(clientId);
  const { mutate: update, isLoading: isPatching } =
    usePatchMeasurement(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: measurementsId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/reports-record/measurements`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/reports-record/measurements`);
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
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"value"}
              label={"Waarde"}
              type={"number"}
              placeholder={"Voer Waarde in"}
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.value && errors.value}
            />

            <InputField
              id={"measurement_type"}
              required={true}
              type={"text"}
              className={"mb-6"}
              label={"Type Meting"}
              placeholder={"Voer Type Meting in"}
              value={values.measurement_type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.measurement_type && errors.measurement_type}
            />
            
            <Button
              type={"submit"}
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Meting bijwerken" : "Meting indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MeasurementsForm;
