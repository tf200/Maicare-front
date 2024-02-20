"use client";

import React, { FunctionComponent } from "react";
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

const initialValues: AllergyFormType = {
  allergy_type: "",
  severity: "",
  reaction: "",
  notes: "",
};

const allergySchema: Yup.ObjectSchema<AllergyFormType> = Yup.object().shape({
  allergy_type: Yup.string()
    .oneOf(ALLERGY_TYPE_ARRAY, "Please select a valid allergy type")
    .required("Please provide an allergy type"),
  severity: Yup.string()
    .oneOf(DIAGNOSIS_SEVERITY_ARRAY, "Please select a valid severity")
    .required("Please provide severity of the allergy"),
  reaction: Yup.string().required("Please provide reaction to the allergy"),
  notes: Yup.string().required("Please provide notes for the allergy"),
});

type Props = {
  clientId: number;
};

const AllergyForm: FunctionComponent<Props> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateAllergy(clientId);
  const router = useRouter();
  const onSubmit = (
    values: AllergyFormType,
    { resetForm }: FormikHelpers<AllergyFormType>
  ) => {
    mutate(
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
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
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
              label={"Allergy Type"}
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
              label={"Severity"}
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
              label={"Reaction"}
              type={"text"}
              placeholder={"Enter reaction to the allergy"}
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
            label={"Diagnosis Notes"}
            placeholder={"Provide notes for the diagnosis"}
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.notes && errors.notes}
          />

          <Button
            type={"submit"}
            disabled={isLoading}
            isLoading={isLoading}
            formNoValidate={true}
            loadingText={"Submitting Recorded Allergy..."}
          >
            Record Allergy
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AllergyForm;
