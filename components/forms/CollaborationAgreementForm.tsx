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
  AttentionRisksShema,
} from "../Questionnaire/collaboration-agreement/attentionRisksForm";

type Props = {
  clientId: number;
  mode?: string;
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
  ...AttentionRisksShema,
});

const FORMS = [
  { name: "Client", component: ClientForm },
  { name: "Probation", component: ProbationForm },
  { name: "Health", component: HealthForm },
  { name: "Attention risks", component: AttentionRisksForm },
];

const CollaborationAgreementForm: React.FC<Props> = ({ clientId, mode }) => {
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {" "}
            {FORMS.map(({ name, component: Component }) => (
              <Component
                key={name}
                handleChange={handleChange}
                values={values}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
            ))}
          </div>
          <Button
            type={"submit"}
            formNoValidate={true}
            loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
          >
            {mode === "edit" ? "Update " : "Create "}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CollaborationAgreementForm;
