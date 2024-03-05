"use client";

import React, { FunctionComponent, useCallback } from "react";
import { AllergyFormType } from "@/types/allergies/allergy-form-type";
import * as Yup from "yup";
import {
  ALLERGY_TYPE_ARRAY,
  ALLERGY_TYPE_OPTIONS,
  DIAGNOSIS_SEVERITY_ARRAY,
  DIAGNOSIS_SEVERITY_OPTIONS,
} from "@/consts";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";
import { useCreateAllergy } from "@/utils/allergies/createAllergy";
import { useRouter } from "next/navigation";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { AllergyType } from "@/types/allergyType";
import { FormikHelpers } from "formik/dist/types";
import { usePatchAllergie } from "@/utils/allergies/patchAllergie";
import { useGetAllergie } from "@/utils/allergies/getAllergie";

const initialValues: AllergyFormType = {
  allergy_type: "",
  severity: "",
  reaction: "",
  notes: "",
};

const allergySchema: Yup.ObjectSchema<AllergyFormType> = Yup.object().shape({
  allergy_type: Yup.string()
    .oneOf(ALLERGY_TYPE_ARRAY, "Selecteer een geldig allergietype")
    .required("Geef alstublieft een allergietype op"),
  severity: Yup.string()
    .oneOf(DIAGNOSIS_SEVERITY_ARRAY, "Selecteer een geldige ernst")
    .required("Geef alstublieft de ernst van de allergie op"),
  reaction: Yup.string().required(
    "Geef alstublieft de reactie op de allergie op"
  ),
  notes: Yup.string().required("Geef alstublieft notities voor de allergie op"),
});

type Props = {
  clientId: number;
  allergieId?: number;
  mode: string;
};

const AllergyForm: FunctionComponent<Props> = ({
  clientId,
  allergieId,
  mode,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetAllergie(allergieId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateAllergy(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchAllergie(clientId);

  const onSubmit = useCallback(
    (
      values: AllergyFormType,
      { resetForm }: FormikHelpers<AllergyFormType>
    ) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: allergieId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/medical-record/allergies`);
            },
          }
        );
      } else if (mode === "new") {
        create(
          {
            ...values,
            severity: values.severity as DiagnosisSeverity,
            allergy_type: values.allergy_type as AllergyType,
            client: clientId,
          },
          {
            onSuccess: () => {
              resetForm();
              router.push(`/clients/${clientId}/medical-record/allergies`);
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
      validationSchema={allergySchema}
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
            <Select
              label={"Type Allergie"}
              id={"allergy_type"}
              required={true}
              options={ALLERGY_TYPE_OPTIONS}
              className="w-full xl:w-1/2"
              value={values.allergy_type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.allergy_type && errors.allergy_type}
            />
            <Select
              label={"Ernst"}
              id={"severity"}
              required={true}
              options={DIAGNOSIS_SEVERITY_OPTIONS}
              className="w-full xl:w-1/2"
              value={values.severity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.severity && errors.severity}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputField
              className={"w-full xl:w-1/2"}
              id={"reaction"}
              required={true}
              label={"Reactie"}
              type={"text"}
              placeholder={"Voer reactie op de allergie in"}
              value={values.reaction}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.reaction && errors.reaction}
            />
          </div>
          <Textarea
            rows={6}
            id={"notes"}
            required={true}
            className={"mb-6"}
            label={"Notities Diagnose"}
            placeholder={"Verschaf notities voor de diagnose"}
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
            {mode === "edit" ? "Allergie bijwerken" : "Allergie indienen"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AllergyForm;
