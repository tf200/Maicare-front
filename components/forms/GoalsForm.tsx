import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useCreateGoal } from "@/utils/goal/createGoal";
import { useRouter } from "next/navigation";
import { usePatchGoal } from "@/utils/goal/patchGoal";
import Select from "@/components/FormFields/Select";
import { useClientDomains } from "@/utils/domains";
import { GoalsFormType, GoalsListItem } from "@/types/goals";

const initialValues: GoalsFormType = {
  title: "",
  desc: "",
  domain_id: "",
};

export const goalsSchema: Yup.ObjectSchema<GoalsFormType> = Yup.object().shape({
  title: Yup.string().required("Geef alstublieft een titel"),
  desc: Yup.string().required("Geef alstublieft een omschrijving"),
  domain_id: Yup.string().required("Selecteer alstublieft een domein"),
});

type PropsType = {
  clientId: number;
  className?: string;
  mode: string;
  onSuccess?: () => void;
  initialData?: GoalsListItem;
};

const dtoToForm = (data: GoalsListItem): GoalsFormType => {
  return {
    title: data.title,
    desc: data.desc,
    domain_id: data.domain_id + "",
  };
};

export const GoalsForm: FunctionComponent<PropsType> = ({
  clientId,
  className,
  mode,
  onSuccess,
  initialData,
}) => {
  const router = useRouter();

  const { mutate: create, isLoading: isCreating } = useCreateGoal(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchGoal(
    clientId,
    initialData?.id
  );

  const onSubmit = useCallback(
    (values: GoalsFormType, { resetForm }: FormikHelpers<GoalsFormType>) => {
      const method = mode === "edit" ? update : create;
      method(values, {
        onSuccess: () => {
          resetForm;
          router.push(`/clients/${clientId}/goals`);
          onSuccess?.();
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
        mode == "edit"
          ? initialData
            ? dtoToForm(initialData)
            : initialValues
          : initialValues
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
              className="mb-4.5"
              label={"Domain"}
              id={"domain_id"}
              options={options}
              required={true}
              disabled={isLoadingDomains}
              value={values.domain_id}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.domain_id && errors.domain_id}
            />

            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"title"}
              label={"Titel"}
              type={"text"}
              placeholder={"Voer titel van het doel in"}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && errors.title}
            />

            <Textarea
              rows={10}
              id={"desc"}
              required={true}
              className={"mb-6"}
              label={"Omschrijving"}
              placeholder={"Geef alstublieft omschrijving"}
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.desc && errors.desc}
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
