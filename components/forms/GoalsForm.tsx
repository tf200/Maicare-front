"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useCreateGoal } from "@/utils/goal/createGoal";
import { useRouter } from "next/navigation";
import { useGetGoal } from "@/utils/goal/getGoal";
import { usePatchGoal } from "@/utils/goal/patchGoal";
import Select from "@/components/FormFields/Select";
import { useClientDomains, useDomains } from "@/utils/domains";
import { GoalsFormType } from "@/types/goals";

const initialValues: GoalsFormType = {
  goal_name: "",
  goal_details: "",
  domain_id: "",
};

export const goalsSchema: Yup.ObjectSchema<GoalsFormType> = Yup.object().shape({
  goal_name: Yup.string().required("Geef alstublieft een titel"),
  goal_details: Yup.string().required("Geef alstublieft een omschrijving"),
  domain_id: Yup.string().required("Selecteer alstublieft een domein"),
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
    (values: GoalsFormType, { resetForm }: FormikHelpers<GoalsFormType>) => {
      const method = mode === "edit" ? update : create;
      method(values, {
        onSuccess: () => {
          resetForm;
          router.push(`/clients/${clientId}/goals`);
        },
      });
    },
    [create, update]
  );

  const { data: domains, isLoading: isLoadingDomains } =
    useClientDomains(clientId);
  const options = useMemo(() => {
    if (!domains)
      return [
        {
          label: "Selecteer domein",
          value: "",
        },
      ];
    return [
      {
        label: "Selecteer domein",
        value: "",
      },
      ...domains?.map((domain) => ({
        label: domain.name,
        value: domain.id + "",
      })),
    ];
  }, [domains]);

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
        touched,
        handleSubmit,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className={className}>
          <div className="p-6.5">
            <Select
              label={"Domain"}
              id={"domain_id"}
              disabled={isLoadingDomains}
              options={options}
              required={true}
              className="mb-4.5"
            />

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
