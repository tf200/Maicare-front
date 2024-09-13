"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";

import { useRouter } from "next/navigation";

import { useCreateStressManagementPlans } from "@/utils/questionnairs/stress-management-plans/useAddStressManagementPlans";
import { useGetSingleStressManagementPlans } from "@/utils/questionnairs/stress-management-plans/useGetStressManagementPlans";
import { useUpdateStressManagementPlans } from "@/utils/questionnairs/stress-management-plans/useUpdateStressManagementPlans";
import GeneralInfos, { GeneralInfosInitialValue, GeneralInfosShema } from "../Questionnaire/stress-management-plans/GeneralInfos";

type Props = {
  clientId: number;
  mode?: string;
  stressManagementPlansId?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
});

const StressManagementPlansForm: React.FC<Props> = ({ clientId, stressManagementPlansId, mode }) => {
  const FORMS = [{ name: "GeneralInfos", component: GeneralInfos, clientId }];

  const router = useRouter();
  const { mutate: createStressManagementPlans, isLoading: isCreating } = useCreateStressManagementPlans(clientId);
  const { data: singleStressManagementPlans, isLoading: isSingleColab } = useGetSingleStressManagementPlans(stressManagementPlansId, clientId);
  const { mutate: updateStressManagementPlans, isLoading: isUpdating } = useUpdateStressManagementPlans(clientId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    const payload = { client_id: clientId, ...values };
    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/stress-management-plans`);
    };
    if (!singleStressManagementPlans) return createStressManagementPlans(payload, { onSuccess });
    return updateStressManagementPlans(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleStressManagementPlans ?? initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {FORMS.map(({ name, component: Component }) => (
                <Component
                  key={name}
                  handleChange={handleChange}
                  values={values}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                  client_id={clientId}
                  setFieldValue={setFieldValue}
                />
              ))}
            </div>
            <Button
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit"
                ? "Aanvraagformulier bijwerken"
                : "Aanvraagformulier maken"}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default StressManagementPlansForm;
