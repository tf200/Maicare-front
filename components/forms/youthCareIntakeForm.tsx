"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";

import { useRouter } from "next/navigation";

import GeneralInfos, {
  GeneralInfosInitialValue,
  GeneralInfosShema,
} from "../Questionnaire/youth-care-intake/GeneralInfos";
import { useCreateYouthCareIntake } from "@/utils/questionnairs/youth-care-intake/useAddYouthCareIntake";
import { useGetSingleYouthCareIntake } from "@/utils/questionnairs/youth-care-intake/useGetYouthCareIntake";
import { useUpdateYouthCareIntake } from "@/utils/questionnairs/youth-care-intake/useUpdateYouthCareIntake";

type Props = {
  clientId: number;
  mode?: string;
  YouthCareIntakeFormId?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
});

const YouthCareIntakeForm: React.FC<Props> = ({ clientId, YouthCareIntakeFormId, mode }) => {
  const FORMS = [{ name: "GeneralInfos", component: GeneralInfos, clientId }];

  const router = useRouter();
  const { mutate: createYouthCareIntakeForm, isLoading: isCreating } =
    useCreateYouthCareIntake(clientId);
  const { data: singleYouthCareIntakeForm, isLoading: isSingleColab } = useGetSingleYouthCareIntake(
    YouthCareIntakeFormId,
    clientId
  );
  const { mutate: updateYouthCareIntakeForm, isLoading: isUpdating } =
    useUpdateYouthCareIntake(clientId, YouthCareIntakeFormId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    const payload = { client_id: clientId, ...values };
    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/youth-care-intake`);
    };
    if (!singleYouthCareIntakeForm) return createYouthCareIntakeForm(payload, { onSuccess });
    return updateYouthCareIntakeForm(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleYouthCareIntakeForm ?? initialValues}
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
              {mode === "edit" ? "Update instroom jeugdzorg" : "instroom jeugdzorg maken"}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default YouthCareIntakeForm;
