"use client";
import React, { useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";
import ClientForm, {
  clientInitialValue,
  clientShema,
} from "../Questionnaire/collaboration-agreement/clientForm";
import HealthForm, {
  HealthInitialValue,
  HealthShema,
} from "../Questionnaire/collaboration-agreement/healthcareForm";
import ProbationForm, {
  ProbationInitialValue,
  ProbationShema,
} from "../Questionnaire/collaboration-agreement/probationForm";
import AttentionRisksForm, {
  AttentionRisksInitialValue,
  AttentionRisksSchema,
} from "../Questionnaire/collaboration-agreement/attentionRisksForm";

import { useRouter } from "next/navigation";
import { useCreateCollabAgreement } from "@/utils/questionnairs/collabration-agreement/useAddCollaborationAgreement";
import { useGetSingleColab } from "@/utils/questionnairs/collabration-agreement/useGetSingleCollab";
import { useUpdateCollab } from "@/utils/questionnairs/collabration-agreement/useUpdateCollaboration";

type Props = {
  clientId: number;
  mode?: string;
  collabId?: number;
};

const initialValues = {
  ...clientInitialValue,
  ...ProbationInitialValue,
  ...HealthInitialValue,
  ...AttentionRisksInitialValue,
};

const formSchema = Yup.object().shape({
  ...clientShema,
  ...ProbationShema,
  ...HealthShema,
  ...AttentionRisksSchema,
});

const CollaborationAgreementForm: React.FC<Props> = ({ clientId, collabId, mode }) => {
  const FORMS = [
    { name: "Client", component: ClientForm, clientId },
    { name: "Probation", component: ProbationForm },
    { name: "Health", component: HealthForm },
    { name: "Attention risks", component: AttentionRisksForm },
  ];

  const router = useRouter();
  const { mutate: createCollab, isLoading: isCreating } = useCreateCollabAgreement(clientId);
  const { data: singleCollab, isLoading: isSingleColab } = useGetSingleColab(collabId, clientId);
  const { mutate: updateCollab, isLoading: isUpdating } = useUpdateCollab(clientId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    const payload = { client_id: clientId, ...values };
    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/collaboration-agreement`);
    };
    if (!singleCollab) return createCollab(payload, { onSuccess });
    return updateCollab(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleCollab ?? initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {FORMS.map(({ name, component: Component, clientId }) => (
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
            {mode === "edit" ? "Samenwerking bijwerken" : "Creëer samenwerking"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CollaborationAgreementForm;
