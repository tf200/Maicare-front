"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";

import { useRouter } from "next/navigation";

import { useCreateForceDevelopmentAnalysis } from "@/utils/questionnairs/force-development-analysis/useAddForceDevelopmentAnalysis";
import { useGetForceDevelopmentAnalysis } from "@/utils/questionnairs/force-development-analysis/useGetForceDevelopmentAnalysis";
import { useUpdateForceDevelopmentAnalysis } from "@/utils/questionnairs/force-development-analysis/useUpdateForceDevelopmentAnalysis";
import GeneralInfos, {
  GeneralInfosInitialValue,
  GeneralInfosShema,
} from "../Questionnaire/force-development-analyses/GeneralInfos";

type Props = {
  clientId: number;
  mode?: string;
  forceDevelopmentAnalysis?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
});

const ForceDevelopmentAnalysisForm: React.FC<Props> = ({
  clientId,
  forceDevelopmentAnalysis,
  mode,
}) => {
  const FORMS = [{ name: "GeneralInfos", component: GeneralInfos, clientId }];

  const router = useRouter();
  const { mutate: createForceDevelopmentAnalysesForm, isLoading: isCreating } =
    useCreateForceDevelopmentAnalysis(clientId);
  const { data: forceDevelopmentAnalysesDetails, isLoading: isSingleColab } =
    useGetForceDevelopmentAnalysis(forceDevelopmentAnalysis, clientId);
  const { mutate: updateForceDevelopmentAnalysesForm, isLoading: isUpdating } =
    useUpdateForceDevelopmentAnalysis(clientId, forceDevelopmentAnalysis);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    const payload = { client_id: clientId, ...values };
    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/force-development-analysis`);
    };
    if (!forceDevelopmentAnalysesDetails)
      return createForceDevelopmentAnalysesForm(payload, { onSuccess });
    return updateForceDevelopmentAnalysesForm(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={forceDevelopmentAnalysesDetails ?? initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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

export default ForceDevelopmentAnalysisForm;
