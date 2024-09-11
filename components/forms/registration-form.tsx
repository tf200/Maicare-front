"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";

import { useRouter } from "next/navigation";

import GeneralInfos, { GeneralInfosInitialValue, GeneralInfosShema, } from "../Questionnaire/registration-form/GeneralInfos";
import { useCreateRegistrationForm } from "@/utils/questionnairs/registration-form/useAddRegistrationForm";
import { useGetSingleRegistrationForm } from "@/utils/questionnairs/registration-form/useGetRegistrationForm";
import { useUpdateRegistrationForm } from "@/utils/questionnairs/registration-form/useUpdateRegistrationForm";

type Props = {
  clientId: number;
  mode?: string;
  registrationFormId?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
});

const RegistrationForm: React.FC<Props> = ({ clientId, registrationFormId, mode }) => {
  const FORMS = [{ name: "GeneralInfos", component: GeneralInfos, clientId }];

  const router = useRouter();
  const { mutate: createRegistrationForm, isLoading: isCreating } = useCreateRegistrationForm(clientId);
  const { data: singleRegistrationForm, isLoading: isSingleColab } = useGetSingleRegistrationForm(registrationFormId, clientId);
  const { mutate: updateRegistrationForm, isLoading: isUpdating } = useUpdateRegistrationForm(clientId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    console.log("form submitted: ", values);
    const payload = { client_id: clientId, ...values };
    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/registration-form`);
    };
    if (!singleRegistrationForm) return createRegistrationForm(payload, { onSuccess });
    return updateRegistrationForm(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleRegistrationForm ?? initialValues}
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

export default RegistrationForm;
