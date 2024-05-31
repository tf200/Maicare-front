"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";

import { useRouter } from "next/navigation";

import { useCreateConsentDeclaration } from "@/utils/questionnairs/consent-declaration/useAddConsentDeclaration";
import { useGetSingleConsentDeclaration } from "@/utils/questionnairs/consent-declaration/useGetConsentDeclaration";
import { useUpdateConsentDeclaration } from "@/utils/questionnairs/consent-declaration/useUpdateConsentDeclaration";
import GeneralInfos, {
  GeneralInfosInitialValue,
  GeneralInfosShema,
} from "../Questionnaire/consent-declaration/GeneralInfos";

type Props = {
  clientId: number;
  mode?: string;
  consentId?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
});

const ConsentDeclarationForm: React.FC<Props> = ({ clientId, consentId, mode }) => {
  const FORMS = [{ name: "GeneralInfos", component: GeneralInfos, clientId }];

  const router = useRouter();
  const { mutate: createConsentDeclaration, isLoading: isCreating } =
    useCreateConsentDeclaration(clientId);
  const { data: singleConsentDeclaration, isLoading: isSingleColab } =
    useGetSingleConsentDeclaration(consentId, clientId);
  const { mutate: updateConsentDeclaration, isLoading: isUpdating } =
    useUpdateConsentDeclaration(clientId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    console.log("values");
    const payload = { client_id: clientId, ...values };

    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/consent-declaration`);
    };
    if (!singleConsentDeclaration) return createConsentDeclaration(payload, { onSuccess });
    return updateConsentDeclaration(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleConsentDeclaration ?? initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors, setFieldValue }) => {
        console.log(errors);
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
                ? "Toestemmingsverklaring bijwerken"
                : "Toestemmingsverklaring maken"}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default ConsentDeclarationForm;
